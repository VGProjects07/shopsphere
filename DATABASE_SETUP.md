# ShopSphere MySQL Database Setup Guide

## Prerequisites
- MySQL Server installed and running
- Node.js and npm installed
- Git (optional)

## Step 1: Update Server .env File

Edit `server/.env` and configure your MySQL credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost        
DB_PORT=3306             
DB_USER=root               
DB_PASSWORD=  root123
DB_NAME=shopsphere         
# Client URL
CLIENT_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_12345!

# Auth Token Expiry
JWT_EXPIRE=7d
```

## Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 3: Setup Database

Run the database setup script to create tables and seed data:

```bash
npm run setup-db
```

This will:
- ✓ Create the `shopsphere` database
- ✓ Create all required tables (users, products, orders, reviews, etc.)
- ✓ Seed initial data (if seed.sql exists)
- ✓ Create indexes for performance

## Step 4: Install Frontend Dependencies

```bash
cd client
npm install
```

This will install Socket.io-client for real-time updates.

## Step 5: Start the Server

```bash
cd server
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

Should output:
```
✓ Connected to MySQL Database
🚀 Server listening on port 5000
📡 Real-time Socket.io enabled
🔗 MySQL Database connected
```

## Step 6: Start the Frontend

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will be available at: `http://localhost:5173`
The API will be available at: `http://localhost:5000/api`

## Real-Time Features

The application now includes real-time updates for:

### Server Events (Socket.io):
- **Product Updates**: When products are created/updated
- **Stock Changes**: When product stock changes
- **Cart Updates**: When cart items are modified
- **Order Updates**: When order status changes
- **Review Added**: When new reviews are posted
- **Wishlist Updates**: When wishlist items change

### Using Real-Time in Frontend Components:

```javascript
import { 
  onProductUpdate, 
  onStockChange, 
  onCartUpdate,
  emitUserLogin 
} from "@/api/socket";

// In your component:
useEffect(() => {
  // Listen for product updates
  onProductUpdate((data) => {
    console.log("Product updated:", data);
    // Update your UI
  });

  // Listen for stock changes
  onStockChange((data) => {
    console.log("Stock changed:", data);
  });

  return () => {
    // Cleanup listeners
  };
}, []);
```

## Database Schema

The database includes the following tables:

### users
- User authentication and profile data
- Roles: customer, admin

### products
- Product catalog with pricing and inventory
- Linked to categories
- Rating and review count

### categories
- Product categories

### orders
- Customer orders with payment and shipping info

### order_items
- Individual items in each order

### cart_items
- Shopping cart for each user

### wishlist
- User wishlists

### reviews
- Product reviews and ratings

## API Endpoints

### Products
- `GET /api/products` - List all products (with filters)
- `GET /api/products/:slug` - Get single product with reviews
- `GET /api/categories` - Get all categories
- `GET /api/products/suggestions?q=search_term` - Search suggest

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:id` - Get order details

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/product/:id` - Get product reviews

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

## Troubleshooting

### Database Connection Issues
```
Error: Access denied for user 'root'@'localhost'
```
- Check your DB_USER and DB_PASSWORD in .env
- Ensure MySQL server is running
- Verify the host and port

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change PORT in .env, or
- Kill the process using port 5000

### Socket.io Connection Issues
- Ensure CORS is properly configured
- Check CLIENT_URL matches your frontend URL
- Check browser console for errors

## Next Steps

1. ✅ Database is connected
2. ✅ Real-time operations are enabled
3. Add admin features for product management
4. Implement payment gateway integration
5. Add email notifications
6. Setup cloud storage for product images

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_USER | MySQL user | root |
| DB_PASSWORD | MySQL password | - |
| DB_NAME | Database name | shopsphere |
| CLIENT_URL | Frontend URL | http://localhost:5173 |
| JWT_SECRET | JWT signing key | - |
| JWT_EXPIRE | Token expiry | 7d |
