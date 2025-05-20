-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample admin users
INSERT INTO users (email, password, role) VALUES
('john@example.com', '$2a$10$Qd9FJx8U2xCQn5EXAMPLEDHASHyHHGue', 'admin'), -- password: password123
('sophie@example.com', '$2a$10$9pOA1dQyRANDOMHASHREe5ZB6I9e', 'admin'); -- password: password123

-- Insert sample customer user
INSERT INTO users (email, password, role) VALUES
('customer1@example.com', '$2a$10$asjkfnsdfEXAMPLEpasss', 'customer'); -- password: password123

-- Insert sample products by John
INSERT INTO products (name, description, price, image_url, user_id) VALUES
('iPhone 14', 'Latest iPhone model', 999.99, 'https://example.com/iphone14.jpg', 1),
('Samsung Galaxy S22', 'Powerful Android phone', 899.99, 'https://example.com/galaxyS22.jpg', 1),
('OnePlus 11', 'Fast and smooth Android phone', 799.99, 'https://example.com/oneplus11.jpg', 1);

-- Insert sample products by Sophie
INSERT INTO products (name, description, price, image_url, user_id) VALUES
('Google Pixel 7', 'Clean Android experience', 899.99, 'https://example.com/pixel7.jpg', 2),
('Xiaomi 12 Pro', 'Affordable and fast', 699.99, 'https://example.com/xiaomi12.jpg', 2),
('Motorola Edge', 'Great mid-range option', 599.99, 'https://example.com/motoedge.jpg', 2);
