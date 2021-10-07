import numpy as np
import pandas as pd
import sqlalchemy
import sqlite3
import json
from sqlalchemy.orm import Session, registry

from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, Table, MetaData, Column
from flask import Flask, jsonify, render_template, request, redirect


#################################################
# Database Setup
#################################################

# create engine to min_wage.db
engine = create_engine(r'sqlite:///min_wage.sqlite')

# reflect the tables
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save references to each table
Pstates = Base.classes.par_states
Pyears =Base.classes.par_years
Ppce =Base.classes.par_pce
Wages = Base.classes.wages
Pce =Base.classes.pce
Rpp = Base.classes.rpp

#################################################
# Flask Setup
#################################################

app = Flask(__name__)



# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/<state>")
def wages(state):
    selW =[Wages.min_wage_eff, Wages.state_name, Wages.year]
    selP =[Pce.pce_value, Pce.pce_cat, Pce.state_name, Pce.year]
    w =[]
    p = []

    session = Session(bind=engine)
    if (state == "US"):
        for r in session.query(*selW).filter(Wages.year == 2020).all():
            rl = dict(r)
            w.append(rl)
        for r in session.query(*selP).filter(Pce.state_name != "United States",Pce.year == 2019, Pce.pce_cat != "Household consumption expenditures (for services)").all():
            rl = dict(r)
            p.append(rl)
    else:
        for r in session.query(*selW).filter(Wages.state_name == state).all():
            rl = dict(r)
            w.append(rl)
        for r in session.query(*selP).filter(Pce.state_name == state, Pce.pce_cat != "Household consumption expenditures (for services)").all():
            rl = dict(r)
            p.append(rl)

    session.close()
    
    return jsonify([w, p])

@app.route("/pick")
def pick():
    selS =[Pstates.full_name]
    selY =[Pyears.year]
    s = []
    y = []

    session = Session(bind=engine)

    for r in session.query(*selS).all():
        rl = dict(r)
        s.append(rl)
    for r in session.query(*selY).all():
        rl = dict(r)
        y.append(rl)

    session.close()

    return jsonify([s, y])

if __name__ == "__main__":
    app.run(debug=True)