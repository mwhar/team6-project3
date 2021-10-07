DROP TABLE IF EXISTS par_states;
DROP TABLE IF EXISTS par_years;
DROP TABLE IF EXISTS par_pce;
DROP TABLE IF EXISTS wages;
DROP TABLE IF EXISTS pce;
DROP TABLE IF EXISTS rpp;

CREATE TABLE "par_states" (
  "full_name" varchar PRIMARY KEY,
  "abbr" varchar
);

CREATE TABLE "par_years" (
  "year" int PRIMARY KEY
);

CREATE TABLE "par_pce" (
  "category" varchar PRIMARY KEY
);

CREATE TABLE "wages" (
  "year" int,
  "state_name" varchar,
  "min_wage" float,
  "min_wage_eff" float,
  "median_wage" float,
  PRIMARY KEY ("year", "state_name")
);

CREATE TABLE "pce" (
  "year" int,
  "state_name" varchar,
  "pce_cat" varchar,
  "pce_value" float ,
  PRIMARY KEY ("year", "state_name", "pce_cat")
);

CREATE TABLE "rpp" (
  "id" int AUTO_INCREMENT PRIMARY KEY,
  "year" int,
  "state_name" varchar,
  "rpp_value" float
);

ALTER TABLE "rpp" ADD FOREIGN KEY ("year") REFERENCES "par_years" ("year");

ALTER TABLE "rpp" ADD FOREIGN KEY ("state_name") REFERENCES "par_states" ("full_name");

ALTER TABLE "wages" ADD FOREIGN KEY ("year") REFERENCES "par_years" ("year");

ALTER TABLE "wages" ADD FOREIGN KEY ("state_name") REFERENCES "par_states" ("full_name");

ALTER TABLE "pce" ADD FOREIGN KEY ("year") REFERENCES "par_years" ("year");

ALTER TABLE "pce" ADD FOREIGN KEY ("state_name") REFERENCES "par_states" ("full_name");

ALTER TABLE "pce" ADD FOREIGN KEY ("pce_cat") REFERENCES "par_pce" ("category");
