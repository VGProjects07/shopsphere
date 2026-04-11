USE shopsphere;

INSERT INTO categories (name, slug) VALUES
('Electronics', 'electronics'),
('Fashion', 'fashion'),
('Home & Kitchen', 'home-kitchen'),
('Books', 'books')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (name, email, password, role, phone, avatar_url) VALUES
('Admin User', 'admin@shopsphere.com', '$2a$10$Q6VQnJJJYJbNQ0sEnH2AB.9vS4cM4qGUVAtM1azrVSu2Ce279b9lG', 'admin', '9999999999', 'https://i.pravatar.cc/150?img=5'),
('Ava Shopper', 'ava@example.com', '$2a$10$Q6VQnJJJYJbNQ0sEnH2AB.9vS4cM4qGUVAtM1azrVSu2Ce279b9lG', 'customer', '8888888888', 'https://i.pravatar.cc/150?img=15')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (category_id, name, slug, brand, description, price, discount_percent, stock, image_url, rating, review_count, featured) VALUES
(1, 'Pulse X Wireless Headphones', 'pulse-x-wireless-headphones', 'SonicWave', 'Immersive over-ear headphones with hybrid ANC and 30-hour battery life.', 129.99, 15, 44, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', 4.7, 126, TRUE),
(1, 'Nova Smartwatch Pro', 'nova-smartwatch-pro', 'Nova', 'AMOLED smartwatch with wellness tracking, GPS, and quick-charge support.', 199.00, 10, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', 4.5, 98, TRUE),
(2, 'Aurora Street Sneakers', 'aurora-street-sneakers', 'Stride', 'Breathable lifestyle sneakers built for all-day wear.', 84.50, 12, 62, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', 4.4, 77, FALSE),
(3, 'Chefstone Cookware Set', 'chefstone-cookware-set', 'Chefstone', '8-piece non-stick cookware set with induction-ready base.', 159.99, 20, 18, 'https://images.unsplash.com/photo-1584990347449-1a0d147f3a67?auto=format&fit=crop&w=900&q=80', 4.8, 53, TRUE),
(4, 'Atomic Habits', 'atomic-habits', 'Penguin', 'A practical guide to building good habits and breaking bad ones.', 18.99, 5, 120, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80', 4.9, 214, FALSE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
(2, 1, 5, 'Excellent soundstage and the battery comfortably lasts a full week of commutes.'),
(2, 2, 4, 'Great tracking features and the display is sharp in daylight.')
ON DUPLICATE KEY UPDATE comment = VALUES(comment);
