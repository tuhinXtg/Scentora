# Scentora — Feature Architecture

## 1. Feature Strategy

Scentora will be developed in three major stages:

* **MVP** — Essential features required for a functioning e-commerce platform.
* **V1** — Professional features that improve the customer and business experience.
* **V2** — Advanced features for scalability, automation, analytics, and personalization.

The project will prioritize core business functionality before advanced features.

---

# 2. Customer Features

## 2.1 Authentication & Account

### MVP

* Customer registration
* Customer login
* Customer logout
* Password hashing
* Access token authentication
* Refresh token authentication
* Profile management
* Password change

### V1

* Forgot password
* Password reset
* Email verification
* Account deactivation

### V2

* Social login
* Multi-factor authentication

---

# 3. Product Discovery

## 3.1 Product Catalog

### MVP

* View all products
* View product details
* Browse categories
* Product search
* Product filtering
* Product sorting
* Pagination
* Stock availability

### V1

* Featured products
* Best-selling products
* New arrivals
* Related products
* Recently viewed products

### V2

* Personalized recommendations
* AI-powered product recommendations
* Advanced search

---

# 4. Product Details

A product detail page should provide:

* Product name
* Description
* Price
* Discounted price
* Product images
* Available sizes
* Stock availability
* Category
* Fragrance information
* Ratings
* Reviews

### MVP

* Product information
* Product images
* Pricing
* Variants
* Stock status

### V1

* Reviews
* Ratings
* Related products

### V2

* Advanced fragrance discovery
* Recommendation system

---

# 5. Shopping Cart

## MVP

Customers can:

* Add products to cart
* Remove products
* Update quantities
* View cart
* Calculate subtotal
* Calculate delivery fee
* Calculate total

## V1

* Apply coupons
* Save cart state
* Move wishlist items to cart

## V2

* Abandoned-cart recovery

---

# 6. Wishlist

## V1

Customers can:

* Add products to wishlist
* Remove products
* View wishlist
* Move products to cart

Wishlist is intentionally excluded from the initial MVP to prioritize the core shopping workflow.

---

# 7. Checkout

## MVP

Checkout should include:

* Customer information
* Shipping address
* Order summary
* Delivery charge
* Final total
* Payment method
* Order confirmation

The checkout process should minimize unnecessary steps.

---

# 8. Payment

## MVP

The payment architecture will support:

* Cash on Delivery
* Online payment integration

The exact payment provider will be selected after confirming the business market.

## Payment Requirements

The backend must:

* Create payment records
* Verify payment status
* Prevent unauthorized payment manipulation
* Handle failed payments
* Handle successful payments
* Maintain payment history

---

# 9. Orders

## MVP

Customers can:

* Create orders
* View order history
* View order details
* View order status
* Cancel eligible orders

## Order Status

Initial order lifecycle:

```text
PENDING
   ↓
CONFIRMED
   ↓
PROCESSING
   ↓
SHIPPED
   ↓
DELIVERED
```

Alternative states:

```text
CANCELLED
RETURNED
REFUNDED
```

The final state transition rules will be defined during backend architecture.

---

# 10. Reviews & Ratings

## V1

Customers can:

* Rate products
* Write reviews
* Edit their reviews

The system should support verified-purchase reviews.

Administrators can:

* View reviews
* Moderate reviews
* Remove inappropriate reviews

---

# 11. Promotions & Coupons

## V1

Administrators can create:

* Percentage discounts
* Fixed discounts
* Expiring coupons
* Usage-limited coupons
* Minimum-order coupons

Potential restrictions:

* Specific products
* Specific categories
* Minimum order amount
* Customer-specific promotions

---

# 12. Customer Notifications

## MVP

Basic order confirmation.

## V1

Notifications for:

* Order confirmation
* Payment confirmation
* Order processing
* Order shipped
* Order delivered
* Order cancellation

Possible channels:

* Email
* In-app notifications

## V2

* SMS
* WhatsApp notifications

---

# 13. Admin Features

# 13.1 Admin Authentication

### MVP

* Admin login
* Secure authentication
* Role-based authorization
* Protected admin routes

---

# 13.2 Admin Dashboard

### MVP

Dashboard should display:

* Total revenue
* Total orders
* Pending orders
* Completed orders
* Total customers
* Total products
* Low-stock products
* Recent orders

### V1

* Sales charts
* Revenue trends
* Best-selling products
* Customer growth
* Order statistics

### V2

* Advanced business analytics
* Customer segmentation
* Forecasting

---

# 14. Product Management

## MVP

Administrators can:

* Create products
* Update products
* Delete products
* Manage prices
* Manage product descriptions
* Manage categories
* Manage product variants
* Manage stock
* Upload product images
* Control product availability

## V1

* Bulk product operations
* Product import/export
* Scheduled product availability

---

# 15. Category Management

## MVP

Administrators can:

* Create categories
* Update categories
* Delete categories
* View categories

Categories may later support hierarchical structures.

Example:

```text
Perfumes
├── Men
├── Women
└── Unisex
```

---

# 16. Inventory Management

## MVP

Administrators can:

* View stock
* Update stock
* Track product variants
* Identify low-stock products
* Mark products unavailable

## V1

* Inventory history
* Stock adjustment records
* Inventory alerts

## V2

* Automated inventory forecasting

---

# 17. Order Management

## MVP

Administrators can:

* View orders
* Search orders
* Filter orders
* View order details
* Update order status
* Update payment status
* Cancel orders
* Manage fulfillment

## V1

* Order history/audit trail
* Advanced filtering
* Export orders

---

# 18. Customer Management

## MVP

Administrators can:

* View customers
* Search customers
* View customer profiles
* View customer order history

## V1

* Customer activity
* Account management
* Customer segmentation

---

# 19. Admin Roles & Permissions

## V1

The system should support multiple administrator roles.

Potential roles:

```text
SUPER_ADMIN
ADMIN
STORE_MANAGER
INVENTORY_MANAGER
ORDER_MANAGER
```

Each role should have specific permissions.

Example:

```text
Inventory Manager
    ↓
Can manage inventory
Cannot manage administrators
```

This will be implemented using role-based access control.

---

# 20. Search & Filtering

## MVP

Search by:

* Product name
* Category

Filters:

* Category
* Price range
* Availability

Sorting:

* Price low → high
* Price high → low
* Newest
* Popular

## V2

Potential advanced search:

* Fragrance notes
* Brand
* Gender
* Longevity
* Occasion
* Fragrance family

---

# 21. Media Management

## MVP

Product images should support:

* Upload
* Update
* Delete
* Multiple images per product

The system should validate:

* File type
* File size
* Image dimensions where necessary

## V1

* Image optimization
* Automatic resizing
* Thumbnail generation

---

# 22. Security Features

Security is a system-wide requirement.

The platform should include:

* Secure password hashing
* Authentication
* Authorization
* Input validation
* Rate limiting
* CORS configuration
* Secure environment variables
* File upload validation
* Protected admin endpoints
* Secure payment verification
* Error handling
* Audit logging for sensitive operations

---

# 23. System Features

These features support the application internally.

### MVP

* Centralized error handling
* Logging
* Environment configuration
* Database migrations
* API versioning
* Health-check endpoint
* Request validation
* API documentation

### V1

* Caching
* Background jobs
* Email service
* Monitoring
* Error tracking

### V2

* Advanced observability
* Event-driven architecture where justified
* Distributed background processing

---

# 24. Feature Priority

## MVP

The MVP represents the minimum professional e-commerce system.

```text
Authentication
Products
Categories
Search
Filtering
Cart
Checkout
Orders
Payments
Inventory
Admin Dashboard
Admin Product Management
Admin Order Management
Customer Management
Basic Security
Testing
Deployment
```

---

## V1

After the MVP:

```text
Wishlist
Reviews
Ratings
Coupons
Notifications
Advanced Analytics
Multiple Admin Roles
Inventory History
Product Recommendations
Bulk Operations
```

---

## V2

Advanced functionality:

```text
AI Recommendations
Advanced Search
Customer Segmentation
Loyalty System
Referral System
Abandoned Cart Recovery
SMS/WhatsApp Notifications
Advanced Analytics
Forecasting
Social Login
MFA
```

---

# 25. Feature Dependency Overview

Some features depend on others.

```text
Authentication
      │
      ├──────────────┐
      ↓              ↓
 Customer        Admin
      │              │
      ↓              ↓
 Products ←──── Product Management
      │
      ↓
    Cart
      │
      ↓
  Checkout
      │
      ├──────────→ Payment
      │
      ↓
    Order
      │
      └──────────→ Admin Order Management
```

Inventory is connected to:

```text
Products
   ↓
Product Variants
   ↓
Inventory
   ↓
Cart
   ↓
Order
```

---

# 26. MVP Definition

The Scentora MVP is complete when a customer can:

```text
Register/Login
      ↓
Browse Products
      ↓
Search/Filter
      ↓
View Product
      ↓
Add to Cart
      ↓
Checkout
      ↓
Pay
      ↓
Place Order
      ↓
Track Order
```

And an administrator can:

```text
Login
  ↓
View Dashboard
  ↓
Manage Products
  ↓
Manage Inventory
  ↓
View Orders
  ↓
Process Orders
  ↓
Manage Customers
```

---

# 27. Feature Development Principle

Features will be implemented incrementally.

For every feature:

```text
Requirement
    ↓
Design
    ↓
Database
    ↓
API
    ↓
Frontend
    ↓
Testing
    ↓
Security Review
    ↓
Documentation
```

No feature should be considered complete until its backend, frontend, validation, error handling, and tests have been considered.

---

# 28. Current Status

| Area              | Status  |
| ----------------- | ------- |
| Customer features | Defined |
| Admin features    | Defined |
| Authentication    | Defined |
| Product system    | Defined |
| Cart              | Defined |
| Checkout          | Defined |
| Orders            | Defined |
| Payment           | Initial |
| Inventory         | Defined |
| Reviews           | Defined |
| Promotions        | Defined |
| Notifications     | Initial |
| Analytics         | Initial |
| MVP scope         | Defined |
| V1 scope          | Defined |
| V2 scope          | Defined |