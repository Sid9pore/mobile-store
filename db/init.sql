-- Create sequnce 
CREATE SEQUENCE user_id_seq START 1 INCREMENT 1;

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
('Samsung Galaxy S22', 'Flagship smartphone with great display', 999.99, 'https://images.samsung.com/is/image/samsung/p6pim/in/2202/gallery/in-galaxy-s22-s901-sm-s901ezvginu-530398997?$650_519_PNG$', 2),
('OnePlus 10 Pro', 'Fast and smooth performance', 849.99, 'https://image01.oneplus.net/ebp/202203/22/1-m00-12-3b-rb8bwlf3uhgaa-8gaaagqee1c662_840_840.png', 2),
('Apple iPhone 13', 'Reliable and powerful iOS device', 1099.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-model-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629940705000', 2),
('Sony Xperia 5 III', 'Compact phone with great camera', 799.99, 'https://m.media-amazon.com/images/I/61tBWW7M7RL._AC_SL1500_.jpg', 2),
('Nokia G50', 'Budget-friendly 5G smartphone', 299.99, 'https://cdn.dxomark.com/wp-content/uploads/medias/post-75441/Nokia-G50-hero-image-review.png', 2),
('Asus ROG Phone 5', 'Gaming phone with high refresh rate', 999.99, 'https://dlcdnwebimgs.asus.com/gain/cfc86006-9b11-41e3-9c8a-f3ea0ed4606e/', 2),
('Google Pixel 6a', 'Affordable Pixel with good camera', 449.99, 'https://store.google.com/us/product/images/phone_pixel_6a_carousel_hero.jpg', 2),
('Realme GT Neo 3', 'Affordable flagship killer', 499.99, 'https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo-3-2.jpg', 2),
('Vivo X70 Pro', 'Excellent camera and performance', 799.99, 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x70-pro-1.jpg', 2),
('Oppo Find X5', 'Premium design and camera features', 899.99, 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x5-pro-1.jpg', 2);

-- Insert sample products by Sophie
INSERT INTO products (name, description, price, image_url, user_id) VALUES
('Samsung Galaxy S23 Ultra', 'Ultimate flagship with advanced camera', 1199.99, 'https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-s23-ultra/gallery/levant-galaxy-s23-ultra-s918-530398451?$650_519_PNG$', 2),
('Apple iPhone 14 Pro', 'Next-gen iPhone with Dynamic Island', 1299.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-select-202209?wid=470&hei=556&fmt=png-alpha&.v=1660753619946', 2),
('Google Pixel 7 Pro', 'Google’s latest with Tensor G2 chip', 899.99, 'https://store.google.com/us/product/images/phone_pixel_7_pro_carousel_hero.jpg', 2),
('OnePlus 11', 'Flagship killer with Snapdragon 8 Gen 2', 699.99, 'https://image01.oneplus.net/ebp/202301/30/1-m00-12-5a-rb8bwl_1k6aaaxjjaaeqa76rl4922_840_840.png', 2),
('Xiaomi 13 Pro', 'Top-tier specs with Leica cameras', 999.99, 'https://i01.appmifile.com/webfile/globalimg/products/pc/mi-13-pro/specs-header.jpg', 2),
('Sony Xperia 1 IV', '4K OLED screen and pro-grade camera', 1299.99, 'https://www.sony.com/image/b9c5db73b3fa6d7a36bc788561fb9385?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF', 2),
('Motorola Edge 40', 'Slim design with solid performance', 499.99, 'https://motorolaus.vtexassets.com/arquivos/ids/158664-800-auto?v=637912771532670000&width=800&height=auto&aspect=true', 2),
('Asus ROG Phone 6', 'Gaming powerhouse with 165Hz display', 999.99, 'https://dlcdnwebimgs.asus.com/gain/1b6b1566-6d5d-48e4-9814-2c6b804254ec/', 2),
('Realme GT 2 Pro', 'Affordable flagship with premium design', 599.99, 'https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-2-pro-1.jpg', 2),
('Vivo X90 Pro+', 'High-end camera experience with ZEISS', 899.99, 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-plus-1.jpg', 2),

('Oppo Find X6 Pro', 'Innovative design with top specs', 1099.99, 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x6-pro-1.jpg', 2),
('Samsung Galaxy Z Fold4', 'Foldable phone with multitasking', 1799.99, 'https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-z-fold4/gallery/levant-galaxy-z-fold4-5g-f936-531422855?$650_519_PNG$', 2),
('Apple iPhone SE (2022)', 'Compact iPhone with A15 Bionic', 429.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select-2022?wid=470&hei=556&fmt=png-alpha&.v=1645572315986', 2),
('Google Pixel 6a', 'Affordable Pixel with great camera', 449.99, 'https://store.google.com/us/product/images/phone_pixel_6a_carousel_hero.jpg', 2),
('OnePlus Nord 3', 'Mid-range phone with solid performance', 399.99, 'https://image01.oneplus.net/ebp/202301/25/1-m00-12-c2-rb8bwl_jx6caee3faafa8gxm7xc4156d0770_840_840.png', 2),
('Xiaomi Redmi Note 12', 'Budget-friendly with AMOLED display', 299.99, 'https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-note-12/specs-header.jpg', 2),
('Sony Xperia 10 IV', 'Compact and lightweight midrange phone', 499.99, 'https://www.sony.com/image/97e1a134d682f3a42a2c822eea52ef61?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF', 2),
('Motorola Moto G Power (2023)', 'Budget phone with huge battery', 199.99, 'https://motorolaus.vtexassets.com/arquivos/ids/157195-800-auto?v=637901892868700000&width=800&height=auto&aspect=true', 2),
('Asus Zenfone 9', 'Compact flagship with Snapdragon 8+', 699.99, 'https://dlcdnwebimgs.asus.com/gain/9f3e28b2-b7b3-4b18-9582-88f2e5cddf5b/', 2),
('Realme Narzo 60', 'Affordable smartphone with good battery', 179.99, 'https://fdn2.gsmarena.com/vv/pics/realme/realme-narzo-60-1.jpg', 2),

('Vivo V27 Pro', 'Stylish phone with good selfie camera', 549.99, 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v27-pro-1.jpg', 2),
('Oppo Reno8 Pro', 'Balanced phone with premium features', 649.99, 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-reno8-pro-1.jpg', 2),
('Samsung Galaxy A54', 'Midrange with great display and battery', 449.99, 'https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-a54/gallery/levant-galaxy-a54-5g-a546-sm-a546elvdmea-536347120?$650_519_PNG$', 2),
('Apple iPhone 13 Mini', 'Compact iPhone with A15 Bionic', 699.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315986', 2),
('Google Pixel 7a', 'Affordable Pixel with flagship features', 499.99, 'https://store.google.com/us/product/images/phone_pixel_7a_carousel_hero.jpg', 2),
('OnePlus 10T', 'Fast charging with powerful specs', 649.99, 'https://image01.oneplus.net/ebp/202208/29/1-m00-19-f7-rb8bwlfuyzuacixvyaaicvcvsui323_840_840.png', 2),
('Xiaomi Poco F5', 'Budget phone with flagship chip', 399.99, 'https://i01.appmifile.com/webfile/globalimg/products/pc/poco-f5/specs-header.jpg', 2),
('Sony Xperia Pro-I', 'Pro-grade camera smartphone', 1799.99, 'https://www.sony.com/image/4cb72d88f79578f8da3bc9ed53d9b670?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF', 2),
('Motorola Razr 2022', 'Foldable phone with modern design', 1399.99, 'https://motorolaus.vtexassets.com/arquivos/ids/158408-800-auto?v=637911358471070000&width=800&height=auto&aspect=true', 2),
('Asus ROG Phone 7', 'Latest gaming phone with top specs', 1099.99, 'https://dlcdnwebimgs.asus.com/gain/7d376da2-2de5-41a2-8758-109d0ec47b2b/', 2);

