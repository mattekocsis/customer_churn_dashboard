# Credit Card Customer Churn & Risk Segmentation Dashboard

Purpose: A bank's customer retention team needs to find out which credit card customer segments are most likely to churn, and what account and usage patterns can predict that risk? The team requires a queryable tool that ranks currently active customers by churn risk so that retention offers can be targeted at the right customers before they leave.

Data Source: Credit Card Customers Dataset - https://www.kaggle.com/datasets/sakshigoyal7/credit-card-customers

Data Size: 23 columns, 10127 rows

Tools Used:
  - Jupyter Notebook (via Anaconda)
  - Python 3.10 (via Jupyter Notebook)
  - VS Code (to ensure SQL magic operations work)
  - Pandas, Numpy (ETL & calculations)
  - Matplotlib, Seaborn (visuals for dashboard)
  - SQLite, sqlalchemy (relational database & running queries)
  - Flask (backend for serving JSON to dashboard)
  - HTML/CSS, Chart.js (frontend dashboard)
  - Git / GitHub (portfolio hosting)
  - Claude Sonnet 5 (brainstorming and ideation, code / spell check, review of deliverables to ensure consistency across project)

Methodology:
 - Define business problem and identify key stakeholders.
 - Set up the work environment and create a clear folder structure.
 - Acquire and inspect the data, drop Naive Bayes columns as per dataset documentation.
 - Split single source file into two related tables to later apply a JOIN in practice.
 - Write the schema as a .sql file to preserve PRIMARY KEY / REFERENCES constraints.
 - Create a SQLite database and execute .sql file to establish table.
 - Write SQL VIEW that joins customers table to account_activity table on client_num via JOIN.
 - EDA to compare attrited and existing customers across transaction count, transaction amount and utilization ratio.
 - Visualize EDA via charts to show the clearest separation between the two groups.
 - Build a percentile risk score ranking customers by transaction count and utilization ratio.
 - Validate the score and save results into a separate table that the dashboard will query.
 - Build a static multi panel dashboard in notebook as summary.
 - Build Flask backend.
 - Build HTML/CSS/JS Frontend.
 - Run and test locally.

Key Visuals:

  - Fig. 1 - Attrited VS. Existing Customers Comparison
<img width="2400" height="750" alt="analysis_eda_comparison" src="https://github.com/user-attachments/assets/c22dfdb8-9c91-42f8-954b-1dd4611d79cb" />

  - Fig. 2 - Static Summary Dashboard
<img width="2100" height="1500" alt="analysis_summary_dashboard" src="https://github.com/user-attachments/assets/2d9a7f48-edd8-4b99-8d54-9ebdb6e884aa" />

Key Findings:
 - The overall attrition rate in the dataset was 16.1%.
 - Attrited customers had a 34.6% lower average transaction count and 45.2% lower average utilization ratio than existing customers — indicating credit utilization is the stronger early warning signal.
 - The churn risk score meaningfully separated the two groups: attrited customers scored 0.694 on average vs. 0.463 for existing customers.
 - The highest-risk active customer segment was concentrated in the $120K and above income category.

Business Recommendation: The retention team should prioritize outreach to active customers scoring in the top percentage of churn risk score, particularly those showing a recent drop in transaction count, since this was the clearest early signal in the data.

Limitations: This is a static snapshot with no time dimension. A production version would use time series data to catch declining engagement in real time.
