import pandas as pd
import sqlalchemy
import sqlite3
import json
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Table, MetaData, Column
from flask import Flask, jsonify, render_template, request, redirect


#################################################
# Database Setup
#################################################

# create engine to min_wage.db
engine = create_engine(r'sqlite:///min_wage.sqlite')

# reflect the tables
meta = MetaData()
meta.reflect(bind = engine)

# Save references to each table
wages_tbl = Table('wages', meta, autoload=engine)
pce_tbl = Table('pce', meta, autoload=engine)
rpp_tbl = Table('rpp', meta, autoload=engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)



# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/api/wages")
def wages():
    session = Session(bind=engine)
    qry = session.query(wages_tbl.c.year,wages_tbl.c.state_name,wages_tbl.c.min_wage_eff)
    df = pd.DataFrame(qry)
    df.columns=["year", "state", "min_wage"]
    result = df.to_json(orient='records')
    session.close()

    return result

@app.route("/api/pce")
def pce():
    session = Session(bind=engine)
    qry = session.query(pce_tbl.c.year,pce_tbl.c.state_name,pce_tbl.c.pce_category,pce_tbl.c.pce_value)
    df = pd.DataFrame(qry)
    df.columns=["year", "state", "category","total"]
    result = df.to_json(orient='records')
    session.close()

    return result

@app.route("/api/rpp")
def rpp():
    session = Session(bind=engine)
    qry = session.query(rpp_tbl.c.year,rpp_tbl.c.state_name,rpp_tbl.c.rpp_value)
    df = pd.DataFrame(qry)
    df.columns=["year", "state", "total"]
    result = df.to_json(orient='records')
    session.close()

    return result

if __name__ == "__main__":
    app.run(debug=True)