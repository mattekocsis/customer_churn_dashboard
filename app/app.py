from pathlib import Path

from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
import pandas as pd

APP_DIR = Path(__file__).resolve().parent
DB_PATH = APP_DIR.parent / "db" / "churn.db"

app = Flask(__name__)
engine = create_engine(f"sqlite:///{DB_PATH}")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/top-risk-customers")
def top_risk_customers():
    df = pd.read_sql(
        "SELECT * FROM customer_scores WHERE attrition_flag = 'Existing Customer' "
        "ORDER BY churn_risk_score DESC LIMIT 25", engine)
    return jsonify(df.to_dict(orient="records"))


@app.route("/api/summary-stats")
def summary_stats():
    df = pd.read_sql(
        "SELECT attrition_flag, COUNT(*) as customer_count, "
        "AVG(total_trans_ct) as avg_trans_ct, AVG(avg_utilization_ratio) as avg_utilization "
        "FROM customer_scores GROUP BY attrition_flag", engine)
    return jsonify(df.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)
