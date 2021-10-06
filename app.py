import pandas as pd
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Table, MetaData
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
@app.route("/api/data")
def data():
    session = Session(engine)
    results = wages_tbl
    session.close()

    # Find one record of data from the mongo database
    # planet_data = mongo.db.collection.find_one()

    # Return template and data
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)