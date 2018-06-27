DROP DATABASE IF EXISTS lululemon;
CREATE DATABASE lululemon;
\c lululemon;

CREATE TABLE products (
	id serial PRIMARY KEY
);

CREATE TABLE users (
	id serial NOT NULL PRIMARY KEY,
	nickname character varying(50) NOT NULL,
	active_since timestamp NOT NULL,
	age integer,
	body_type character varying(25),
	athletic_type character varying(25),
	city character varying(50) NOT NULL,
	state character varying(50) NOT NULL,
	country character varying(50) NOT NULL
);

CREATE TABLE reviews (
	id serial NOT NULL PRIMARY KEY,
	created_at timestamp NOT NULL,
	title character varying(500) NOT NULL,
	details character varying(5000) NOT NULL,
	fit character varying(50) NOT NULL,
	rating integer NOT NULL,
	what_you_like character varying(250),
	what_you_didnt_like character varying(250),
	voted_helpful integer DEFAULT 0,
	voted_not_helpful integer DEFAULT 0,
	inappropriate integer DEFAULT 0,
	user_id integer REFERENCES users(id),
	product_id integer REFERENCES products(id)
);

COPY products(id) 
FROM '/Users/staceyrutherford/HackReactor/SDC/reviews-component/database/mockData/products.csv' DELIMITER ',' CSV HEADER;

COPY users(nickname,active_since,age,body_type,athletic_type,city,state,country) 
FROM '/Users/staceyrutherford/HackReactor/SDC/reviews-component/database/mockData/users.csv' DELIMITER ',' CSV HEADER;

COPY reviews(created_at, title, details, fit, rating, what_you_like, what_you_didnt_like, voted_helpful, voted_not_helpful, inappropriate, user_id, product_id) 
FROM '/Users/staceyrutherford/HackReactor/SDC/reviews-component/database/mockData/reviews.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX product_id_index ON reviews (product_id);

