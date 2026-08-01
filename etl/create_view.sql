DROP VIEW IF EXISTS customer_risk_features;

CREATE VIEW customer_risk_features AS
SELECT
    c.client_num,
    c.attrition_flag,
    c.customer_age,
    c.income_category,
    c.card_category,
    a.months_on_book,
    a.credit_limit,
    a.total_trans_ct,
    a.total_trans_amt,
    a.avg_utilization_ratio,
    a.total_relationship_count
FROM customers c
JOIN account_activity a ON c.client_num = a.client_num;
