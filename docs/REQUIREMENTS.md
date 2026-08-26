# Scentora — Requirements Specification

## 1. Project Overview

Scentora is a production-oriented e-commerce platform for a perfume business. It will provide customers with a modern shopping experience and administrators with tools to manage the store.

---

## 2. Project Goals

* Provide a professional online perfume shopping experience.
* Allow customers to discover, compare, and purchase products.
* Provide secure customer authentication.
* Provide complete order and inventory management.
* Provide administrators with a centralized management dashboard.
* Build a secure, scalable, maintainable system.
* Deploy the application as a real production web application.

---

## 3. Target Users

### 3.1 Customers

Customers can browse products, manage their accounts, purchase perfumes, and track their orders.

### 3.2 Administrators

Administrators manage products, inventory, orders, customers, promotions, and store operations.

### 3.3 Future Staff Roles

The system may later support specialized roles such as:

* Store Manager
* Order Manager
* Inventory Manager
* Content Manager

---

# 4. Customer Requirements

## 4.1 Product Discovery

Customers should be able to:

* Browse all perfumes.
* Browse products by category.
* Search for products.
* Filter products.
* Sort products.
* View featured products.
* View popular/best-selling products.
* View related products.

## 4.2 Product Details

Each product should provide:

* Product name
* Description
* Price
* Discounted price when applicable
* Images
* Available sizes/variants
* Stock availability
* Category
* Fragrance information where applicable
* Product ratings
* Customer reviews

## 4.3 Customer Account

Customers should be able to:

* Register.
* Login.
* Logout.
* Manage their profile.
* Change their password.
* Reset a forgotten password.
* Manage shipping addresses.

## 4.4 Shopping Cart

Customers should be able to:

* Add products to cart.
* Remove products.
* Change quantities.
* View subtotal.
* Apply coupons.
* View delivery charges.
* View final total.

## 4.5 Wishlist

Customers should be able to:

* Add products to wishlist.
* Remove products.
* View saved products.
* Move products from wishlist to cart.

## 4.6 Checkout

Customers should be able to:

* Select or enter a shipping address.
* Review cart items.
* Apply discounts.
* Select a payment method.
* Review the final order.
* Place an order.
* Receive order confirmation.

## 4.7 Orders

Customers should be able to:

* View previous orders.
* View individual order details.
* Track order status.
* Cancel eligible orders.
* View payment status.

## 4.8 Reviews

Customers should be able to:

* Rate purchased products.
* Write reviews.
* Edit their reviews where appropriate.

Only verified purchases should be eligible for verified reviews.

---

# 5. Admin Requirements

## 5.1 Dashboard

Administrators should be able to see:

* Total sales
* Total orders
* Pending orders
* Completed orders
* Total customers
* Total products
* Low-stock products
* Recent orders
* Best-selling products

## 5.2 Product Management

Administrators should be able to:

* Create products.
* Update products.
* Remove products.
* Upload product images.
* Manage product categories.
* Manage product variants/sizes.
* Set prices.
* Set discounts.
* Manage product availability.

## 5.3 Inventory Management

Administrators should be able to:

* View stock levels.
* Update stock.
* Track low-stock products.
* Mark products unavailable.
* Manage inventory for product variants.

## 5.4 Order Management

Administrators should be able to:

* View orders.
* View order details.
* Update order status.
* Update payment status.
* Cancel orders.
* Manage fulfillment.

Potential order lifecycle:

```text
Pending
   ↓
Confirmed
   ↓
Processing
   ↓
Shipped
   ↓
Delivered
```

Possible alternative states:

```text
Cancelled
Returned
Refunded
```

The final state machine will be defined during system design.

## 5.5 Customer Management

Administrators should be able to:

* View customers.
* View customer order history.
* Manage customer accounts where appropriate.
* Disable accounts when necessary.

## 5.6 Promotion Management

Administrators should be able to:

* Create coupons.
* Set discount percentages.
* Set fixed discounts.
* Set expiration dates.
* Set usage limits.
* Restrict coupons to products/categories where appropriate.

## 5.7 Review Management

Administrators should be able to:

* View reviews.
* Moderate reviews.
* Remove inappropriate reviews.

---

# 6. Business Requirements

The following are initial assumptions and must be confirmed with the business owner.

### Products

* The store sells perfumes.
* Products may have multiple sizes.
* Different sizes may have different prices.
* Products have limited inventory.
* Products can become unavailable.

### Pricing

The system should support:

* Regular prices
* Discounted prices
* Promotional discounts
* Coupon-based discounts

### Delivery

The system should support configurable delivery charges.

The exact delivery zones and pricing will be determined later.

### Payments

The platform should support:

* Cash on Delivery
* Online payment

The exact payment provider will depend on the business location and requirements.

### Currency

The primary currency will be determined after confirming the business market.

---

# 7. Non-Functional Requirements

## 7.1 Security

The system must:

* Secure user passwords using strong hashing.
* Protect authenticated endpoints.
* Enforce role-based authorization.
* Validate user input.
* Protect sensitive configuration values.
* Prevent unauthorized administrative access.
* Validate uploaded files.
* Avoid exposing sensitive information in errors.

## 7.2 Performance

The application should:

* Load pages efficiently.
* Use pagination for large datasets.
* Optimize database queries.
* Optimize images.
* Avoid unnecessary API requests.
* Support caching where beneficial.

## 7.3 Scalability

The architecture should allow future growth in:

* Products
* Customers
* Orders
* Traffic
* Administrative users

The system should be structured so that additional functionality can be introduced without major architectural changes.

## 7.4 Reliability

The system should:

* Handle errors gracefully.
* Maintain database consistency.
* Use transactions for critical operations.
* Log important backend errors.
* Provide health-check functionality.

## 7.5 Maintainability

The codebase should:

* Follow consistent coding conventions.
* Use modular architecture.
* Separate business logic from API routes.
* Include automated tests.
* Maintain clear documentation.

## 7.6 Accessibility

The frontend should aim to:

* Support keyboard navigation.
* Use semantic HTML.
* Provide accessible form labels.
* Maintain readable contrast.
* Provide useful error messages.

## 7.7 Responsiveness

The application should provide a good experience across:

* Mobile
* Tablet
* Desktop

---

# 8. MVP Scope

The first production milestone should focus on the essential shopping workflow.

### MVP Customer Features

* Product browsing
* Product search
* Product filtering
* Product details
* Customer registration/login
* Cart
* Checkout
* Address management
* Order creation
* Order history
* Basic order tracking

### MVP Admin Features

* Admin authentication
* Dashboard
* Product management
* Category management
* Inventory management
* Order management
* Customer management

### MVP Infrastructure

* PostgreSQL
* REST API
* Authentication
* Validation
* Error handling
* Automated testing
* Docker-based development
* Production deployment

---

# 9. Future Features

Features that can be added after the MVP:

* Wishlist
* Product reviews
* Advanced coupons
* Advanced analytics
* Product recommendations
* Email notifications
* SMS notifications
* Multiple administrator roles
* Loyalty system
* Referral system
* Abandoned-cart recovery
* Advanced search
* Personalized recommendations

These features should not delay the initial MVP.

---

# 10. Core User Journey

The primary customer journey is:

```text
Home
  ↓
Browse/Search Products
  ↓
Product Details
  ↓
Add to Cart
  ↓
Review Cart
  ↓
Login/Register
  ↓
Checkout
  ↓
Shipping Information
  ↓
Payment
  ↓
Order Confirmation
  ↓
Track Order
```

The primary administrator journey is:

```text
Admin Login
    ↓
Dashboard
    ↓
Manage Products
    ↓
Manage Inventory
    ↓
Receive Order
    ↓
Process Order
    ↓
Update Order Status
    ↓
Complete Fulfillment
```

---

# 11. Requirements Status

| Requirement Area      | Status     |
| --------------------- | ---------- |
| Project goals         | Defined    |
| Target users          | Defined    |
| Customer requirements | Initial    |
| Admin requirements    | Initial    |
| Business requirements | Assumed    |
| Payment requirements  | To confirm |
| Delivery requirements | To confirm |
| Currency              | To confirm |
| MVP scope             | Defined    |
| Future features       | Defined    |

---

# 12. Requirement Validation

Before production launch, the following assumptions must be confirmed with the business owner:

* Product types
* Product sizes
* Pricing model
* Inventory process
* Delivery locations
* Delivery charges
* Payment methods
* Currency
* Return/refund policy
* Cancellation policy
* Business contact information
* Tax requirements
* Promotional strategy
