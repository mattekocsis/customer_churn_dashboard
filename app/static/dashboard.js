async function fetchJSON(url) {
    const res = await fetch(url);
    return res.json();
}

function renderSummaryCards(summary) {
    const container = document.getElementById("summaryCards");
    const existing = summary.find(d => d.attrition_flag === "Existing Customer") || {};
    const attrited = summary.find(d => d.attrition_flag === "Attrited Customer") || {};
    const totalCustomers = (existing.customer_count || 0) + (attrited.customer_count || 0);
    const attritionRate = totalCustomers ? ((attrited.customer_count || 0) / totalCustomers * 100).toFixed(1) : "0";

    const cards = [
        { label: "Total Customers", value: totalCustomers },
        { label: "Attrition Rate", value: `${attritionRate}%` },
        { label: "Avg Trans. Count (Existing)", value: (existing.avg_trans_ct || 0).toFixed(1) },
        { label: "Avg Trans. Count (Attrited)", value: (attrited.avg_trans_ct || 0).toFixed(1) },
    ];

    container.innerHTML = cards.map(c => `
        <div class="card">
            <div class="label">${c.label}</div>
            <div class="value">${c.value}</div>
        </div>
    `).join("");
}

function renderRiskChart(customers) {
    const ctx = document.getElementById("riskChart");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: customers.map(c => c.client_num),
            datasets: [{
                label: "Churn Risk Score",
                data: customers.map(c => c.churn_risk_score),
                backgroundColor: "#C44E52"
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { autoSkip: false, maxRotation: 60 } } }
        }
    });
}

function renderTable(customers) {
    const tbody = document.querySelector("#riskTable tbody");
    tbody.innerHTML = customers.map(c => `
        <tr>
            <td>${c.client_num}</td>
            <td>${c.customer_age}</td>
            <td>${c.income_category}</td>
            <td>${c.card_category}</td>
            <td>${c.total_trans_ct}</td>
            <td>${(c.avg_utilization_ratio ?? 0).toFixed(2)}</td>
            <td>${c.churn_risk_score.toFixed(3)}</td>
        </tr>
    `).join("");
}

(async function init() {
    const [summary, topRisk] = await Promise.all([
        fetchJSON("/api/summary-stats"),
        fetchJSON("/api/top-risk-customers")
    ]);
    renderSummaryCards(summary);
    renderRiskChart(topRisk.slice(0, 15));
    renderTable(topRisk);
})();
