CREATE TABLE IF NOT EXISTS customers (
    client_num          INTEGER PRIMARY KEY,
    attrition_flag        TEXT,
    customer_age            INTEGER,
    gender                    TEXT,
    dependent_count            INTEGER,
    education_level              TEXT,
    marital_status                 TEXT,
    income_category                  TEXT,
    card_category                      TEXT
);

CREATE TABLE IF NOT EXISTS account_activity (
    client_num             INTEGER REFERENCES customers(client_num),
    months_on_book            INTEGER,
    total_relationship_count    INTEGER,
    credit_limit                   REAL,
    total_revolving_bal               REAL,
    avg_open_to_buy                     REAL,
    total_trans_amt                       REAL,
    total_trans_ct                          INTEGER,
    avg_utilization_ratio                     REAL
);
