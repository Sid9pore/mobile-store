-- Create sequnce 
CREATE SEQUENCE user_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE product_id_seq START 1 INCREMENT 1;

--Create user table

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY DEFAULT nextval('user_id_seq'),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY DEFAULT nextval('product_id_seq'),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(100),
    model_number VARCHAR(100),
    color VARCHAR(100),
    specifications TEXT,
    warranty TEXT,
    stock_quantity INTEGER DEFAULT 0,
    rating NUMERIC(2, 1),
    price NUMERIC(10, 2) NOT NULL,
    image_data BYTEA,
    created_by_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert sample admin users
INSERT INTO users (email, password, role) VALUES
('john@example.com', '$2a$10$Qd9FJx8U2xCQn5EXAMPLEDHASHyHHGue', 'admin')
ON CONFLICT (email) DO NOTHING;;
-- Insert sample products by John
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('Samsung Galaxy S23', 'Flagship smartphone with high-end specs', 'Samsung', 'SM-S911B', 'Phantom Black', '6.1-inch AMOLED, Snapdragon 8 Gen 2, 128GB Storage, 8GB RAM', '1 year manufacturer warranty', 50, 4.7, 999.99, pg_read_binary_file('/docker-entrypoint-initdb.d/images/iphone 11.png'), 1);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('Apple iPhone 14 Pro', 'High-performance smartphone with Dynamic Island', 'Apple', 'A2890', 'Deep Purple', '6.1-inch OLED, A16 Bionic, 256GB Storage, 6GB RAM', '1 year AppleCare warranty', 30, 4.8, 1299.99, pg_read_binary_file('/docker-entrypoint-initdb.d/images/ipohne 14pro.jpg'), 1);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('Google Pixel 7 Pro', 'Premium phone with top-tier camera and clean Android', 'Google', 'GFE4J', 'Snow', '6.7-inch OLED, Google Tensor G2, 128GB Storage, 12GB RAM', '2 years Google warranty', 25, 4.6, 899.99, pg_read_binary_file('/docker-entrypoint-initdb.d/images/pixel7a.webp'), 1);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('OnePlus 11', 'Fast and smooth phone with Snapdragon 8 Gen 2', 'OnePlus', 'PHB110', 'Titan Black', '6.7-inch AMOLED, 256GB Storage, 16GB RAM', '1 year OnePlus warranty', 35, 4.5, 749.99, pg_read_binary_file('/docker-entrypoint-initdb.d/images/ipohne 14pro.jpg'), 1);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('Sony Xperia 1 IV', '4K display with pro-grade camera features', 'Sony', 'XQ-CT72', 'Black', '6.5-inch 4K OLED, Snapdragon 8 Gen 1, 512GB Storage, 12GB RAM', '1 year Sony warranty', 20, 4.4, 1199.99,pg_read_binary_file('/docker-entrypoint-initdb.d/images/iphone 11.png'), 2);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('Pixel 7a', 'Top quality smartphone from Google', 'Google', 'GHL1X', 'Charcoal', '6.5-inch AMOLED display, 128GB Storage, 8GB RAM, Snapdragon 8 Gen 1 processor', '1 year manufacturer warranty', 93, 4.3, 355.23, pg_read_binary_file('/docker-entrypoint-initdb.d/images/pixel7a.webp'), 2);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('iPhone 13 Mini', 'Top quality smartphone from Apple', 'Apple', 'A2481', 'Blue', '6.5-inch AMOLED display, 128GB Storage, 8GB RAM, Snapdragon 8 Gen 1 processor', '1 year manufacturer warranty', 49, 4.3, 409.5, pg_read_binary_file('/docker-entrypoint-initdb.d/images/ipohne 14pro.jpg'), 2);
INSERT INTO products (name, description, brand, model_number, color, specifications, warranty, stock_quantity, rating, price, image_data, created_by_id) VALUES ('X30 5G', 'Top quality smartphone from Nokia', 'Nokia', 'TA-1450', 'Cloudy Blue', '6.5-inch AMOLED display, 128GB Storage, 8GB RAM, Snapdragon 8 Gen 1 processor', '1 year manufacturer warranty', 90, 4.6, 1270.94, pg_read_binary_file('/docker-entrypoint-initdb.d/images/iphone 11.png'), 2);
