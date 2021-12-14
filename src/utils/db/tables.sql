CREATE TABLE IF NOT EXISTS product
(
    product_id INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR (50)  NOT NULL,
    description VARCHAR(255)  NOT NULL,
	brand VARCHAR(50)  NOT NULL,
	image_url VARCHAR(255)  NOT NULL,
	price VARCHAR(10)  NOT NULL,
	category VARCHAR(10)  NOT NULL,
	created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


CREATE TABLE IF NOT EXISTS review
(
    review_id INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY ,
    comment VARCHAR(100) NOT NULL,
    rate VARCHAR(50) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    product_id INTEGER REFERENCES product,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);