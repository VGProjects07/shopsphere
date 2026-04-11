# ShopSphere - E-commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MySQL, featuring an Amazon-style user experience with responsive design and smooth animations.

## Features

### Frontend (React + CSS + JavaScript)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Animated UI components with hover effects and transitions
- ✅ Product carousel with smooth animations
- ✅ Live search with suggestions
- ✅ Category filtering
- ✅ Wishlist functionality
- ✅ Shopping cart with quantity management
- ✅ User authentication (login/signup)
- ✅ Product details with reviews and ratings
- ✅ Checkout process with mock payment
- ✅ User profile management
- ✅ Order tracking
- ✅ Admin dashboard with analytics

### Backend (Node.js + Express.js)
- ✅ RESTful API architecture
- ✅ JWT authentication and authorization
- ✅ Input validation and error handling
- ✅ Middleware for security (helmet, CORS)
- ✅ Product management APIs
- ✅ User management APIs
- ✅ Cart and wishlist APIs
- ✅ Order management APIs
- ✅ Review system APIs
- ✅ Admin routes for analytics

### Database (MySQL)
- ✅ Complete schema with relationships
- ✅ Users, Products, Categories tables
- ✅ Orders, OrderItems, Cart, Wishlist tables
- ✅ Reviews and ratings system
- ✅ Optimized indexing for search

## Tech Stack

- **Frontend**: React 18, React Router, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js, JWT, bcrypt
- **Database**: MySQL 8.0
- **Styling**: Custom CSS with animations and responsive design
- **Tools**: Vite (build tool), ESLint, Prettier

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL 8.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dbms_project
   ```

2. **Set up the database**
   ```bash
   # Start MySQL service
   # Create database and run schema
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/seed.sql
   ```

3. **Configure environment variables**

   **Server (.env)**
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=shopsphere
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   ```

   **Client (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Start the backend server
   cd server
   npm run dev

   # Terminal 2: Start the frontend development server
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## Default Users

- **Admin User**: admin@shopsphere.com / password123
- **Regular User**: ava@example.com / password123

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/password-reset/request` - Request password reset

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:slug` - Get product details
- `GET /api/products/categories/all` - Get all categories
- `GET /api/products/suggestions/live` - Search suggestions

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Cart & Wishlist
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Add product review

### Admin (Protected)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/products` - All products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - All orders
- `PUT /api/admin/orders/:id` - Update order status

## Project Structure

```
dbms_project/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── data/          # Mock data
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utilities
│   └── package.json
└── database/               # MySQL files
    ├── schema.sql         # Database schema
    └── seed.sql           # Sample data
```

## Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the dist/ folder
```

### Backend (Render/Heroku)
```bash
cd server
npm start
# Configure environment variables in hosting platform
```

### Database (AWS RDS/PlanetScale)
- Set up MySQL database in cloud
- Update environment variables
- Run schema.sql and seed.sql

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.