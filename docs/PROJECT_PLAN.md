# Scentora — Project Plan

## 1. Project Overview

Scentora is a production-oriented full-stack e-commerce platform for a real perfume business.

The goal is to build a professional, secure, scalable, responsive, and maintainable web application while learning modern full-stack development through practical implementation.

---

## 2. Project Goals

- Build a real-world perfume e-commerce platform
- Create a premium customer experience
- Build a complete admin dashboard
- Implement secure authentication and authorization
- Use JWT-based authentication
- Design a scalable PostgreSQL database
- Build a RESTful FastAPI backend
- Build a modern React frontend
- Implement product, cart, wishlist, order, payment, and inventory systems
- Follow professional software engineering practices
- Implement automated testing
- Use Docker for development and deployment
- Implement CI/CD
- Deploy the application to production
- Create a professional portfolio and CV project

---

# 3. Development Phases

## Phase 1 — Requirements

Understand the actual business requirements before development.

### Tasks

- Understand business needs
- Identify customer requirements
- Identify admin requirements
- Define business rules
- Define product structure
- Define order workflow
- Define payment requirements
- Define inventory requirements
- Define shipping requirements
- Define authentication requirements
- Identify scalability requirements

### Deliverable

`docs/REQUIREMENTS.md`

---

## Phase 2 — Features

Define all customer and admin features.

### Customer Features

- Registration and login
- JWT authentication
- Product browsing
- Search
- Filtering
- Sorting
- Product details
- Product variants
- Shopping cart
- Wishlist
- Address management
- Checkout
- Coupons
- Payments
- Order tracking
- Order history
- Product reviews
- Customer profile

### Admin Features

- Admin authentication
- Dashboard
- Product management
- Category management
- Inventory management
- Order management
- Customer management
- Review moderation
- Coupon management
- Sales analytics
- Settings

### Deliverable

`docs/FEATURES.md`

---

## Phase 3 — System Architecture

Design the overall application architecture.

### Areas

- Frontend architecture
- Backend architecture
- Database architecture
- API architecture
- Authentication
- Authorization
- File storage
- Payments
- Deployment
- Security

### Deliverable

`docs/ARCHITECTURE.md`

---

## Phase 4 — Database Architecture

Design the relational database.

### Database

PostgreSQL

### ORM

SQLAlchemy

### Migration Tool

Alembic

### Main Entities

- User
- Role
- Address
- Category
- Product
- ProductVariant
- ProductImage
- Inventory
- Cart
- CartItem
- Wishlist
- WishlistItem
- Order
- OrderItem
- Payment
- Coupon
- Review

### Deliverable

`docs/DATABASE.md`

---

## Phase 5 — API Architecture

Design the REST API.

### Backend

FastAPI

### API Version

`/api/v1`

### Main API Areas

- Authentication
- Users
- Products
- Categories
- Cart
- Wishlist
- Addresses
- Orders
- Payments
- Reviews
- Coupons
- Admin

### Authentication

JWT-based authentication with:

- Access tokens
- Refresh tokens
- Token expiration
- Password hashing
- Authentication dependencies
- Role-based authorization

### Deliverable

`docs/API.md`

---

## Phase 6 — UI/UX Architecture

Design the complete customer and admin experience.

### Customer Pages

- Home
- Shop
- Product Details
- Categories
- Search
- Cart
- Checkout
- Order Confirmation
- Orders
- Order Details
- Wishlist
- Profile
- Addresses
- Login
- Register
- Forgot Password
- Reset Password

### Admin Pages

- Dashboard
- Products
- Product Creation
- Product Editing
- Categories
- Inventory
- Orders
- Customers
- Reviews
- Coupons
- Settings

### UI Requirements

- Premium design
- Responsive layout
- Mobile-first approach
- Reusable components
- Loading states
- Empty states
- Error states
- Accessibility
- Performance optimization

### Deliverable

`docs/UI_UX.md`

---

## Phase 7 — Development Architecture

Define the development environment and coding standards.

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic
- PostgreSQL
- JWT

### Tools

- Git
- GitHub
- Docker
- Docker Compose
- pytest
- Ruff
- ESLint
- Prettier

### Deliverable

`docs/DEVELOPMENT.md`

---

## Phase 8 — Repository Setup

Initialize the project.

```text
scentora/
├── frontend/
├── backend/
├── docs/
├── .gitignore
├── README.md
└── docker-compose.yml