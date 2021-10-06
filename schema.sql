-- create Median Household Income Table
CREATE TABLE median_household_income(
state VARCHAR,
yr_2020 FLOAT,
yr_2019 FLOAT,
yr_2018 FLOAT,
yr_2017 FLOAT,
yr_2016 FLOAT,
yr_2015 FLOAT,
yr_2014 FLOAT,
yr_2013 FLOAT,
yr_2012 FLOAT,
yr_2011 FLOAT,
yr_2010 FLOAT,
yr_2009 FLOAT,
yr_2008 FLOAT,
yr_2007 FLOAT,
yr_2006 FLOAT,
yr_2005 FLOAT,
yr_2004 FLOAT,
yr_2003 FLOAT,
yr_2002 FLOAT,
yr_2001 FLOAT,
yr_2000 FLOAT,
yr_1999 FLOAT,
yr_1998 FLOAT,
yr_1997 FLOAT,
yr_1996 FLOAT,
yr_1995 FLOAT,
yr_1994 FLOAT,
yr_1993 FLOAT,
yr_1992 FLOAT,
yr_1991 FLOAT,
yr_1990 FLOAT,
yr_1989 FLOAT,
yr_1988 FLOAT,
yr_1987 FLOAT,
yr_1986 FLOAT,
yr_1985 FLOAT,
yr_1984 FLOAT
);

--create Minimum Wage Table
CREATE TABLE minimum_wage(
year VARCHAR,
state VARCHAR,
state_minimum_wage VARCHAR,
effective_minimum_wage VARCHAR);

--create Per Capita PCE Table
CREATE TABLE per_capita_pce(
state VARCHAR,
pce_category VARCHAR,
yr_1997 FLOAT,
yr_1998 FLOAT,
yr_1999 FLOAT,
yr_2000 FLOAT,
yr_2001 FLOAT,
yr_2002 FLOAT,
yr_2003 FLOAT,
yr_2004 FLOAT,
yr_2005 FLOAT,
yr_2006 FLOAT,
yr_2007 FLOAT,
yr_2008 FLOAT,
yr_2009 FLOAT,
yr_2010 FLOAT,
yr_2011 FLOAT,
yr_2012 FLOAT,
yr_2013 FLOAT,
yr_2014 FLOAT,
yr_2015 FLOAT,
yr_2016 FLOAT,
yr_2017 FLOAT,
yr_2018 FLOAT,
yr_2019 FLOAT);
SELECT * FROM per_capita_pce;

--create Regional Price Parities Table
CREATE TABLE regional_price_parities(
state VARCHAR,
yr_2008 FLOAT,
yr_2009 FLOAT,
yr_2010 FLOAT,
yr_2011 FLOAT,
yr_2012 FLOAT,
yr_2013 FLOAT,
yr_2014 FLOAT,
yr_2015 FLOAT,
yr_2016 FLOAT,
yr_2017 FLOAT,
yr_2018 FLOAT,
yr_2019 FLOAT);