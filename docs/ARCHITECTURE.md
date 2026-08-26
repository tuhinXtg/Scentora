# Scentora — System Architecture

## 1. Architecture Goal

Scentora will use a modular architecture designed to be:

* Maintainable
* Secure
* Testable
* Scalable
* Easy to understand
* Suitable for production
* Suitable for future feature expansion

The initial system will use a **Modular Monolith Architecture**.

This means Scentora will have one backend application, but its internal functionality will be separated into clear modules.

We will not start with microservices because they would introduce unnecessary complexity at the current stage.

---

# 2. High-Level Architecture

```text
                         ┌─────────────────────┐
                         │      Customer       │
                         │   Browser / Mobile  │
                         └──────────┬──────────┘
                                    │
                                  HTTPS
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    React Frontend   │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                              REST / JSON
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │       FastAPI Backend        │
                    │                              │
                    │ ┌──────────────────────────┐ │
                    │ │ Authentication            │ │
                    │ │ Authorization             │ │
                    │ │ Products                  │ │
                    │ │ Categories                │ │
                    │ │ Cart                      │ │
                    │ │ Wishlist                  │ │
                    │ │ Orders                    │ │
                    │ │ Payments                  │ │
                    │ │ Inventory                 │ │
                    │ │ Users                     │ │
                    │ │ Reviews                   │ │
                    │ │ Promotions                │ │
                    │ └──────────────────────────┘ │
                    └──────────────┬───────────────┘
                                   │
                   ┌───────────────┼────────────────┐
                   │               │                │
                   ▼               ▼                ▼
          ┌────────────────┐ ┌─────────────┐ ┌───────────────┐
          │  PostgreSQL    │ │    Redis    │ │ Object Storage│
          │   Database     │ │   Cache     │ │ Product Images│
          └────────────────┘ └─────────────┘ └───────────────┘
                                   │
                                   ▼
                           Background Jobs
```

Redis, object storage, and background processing will be introduced only when their use cases are justified.

---

# 3. Frontend Architecture

The frontend will use:

* React
* TypeScript
* Vite
* Tailwind CSS

The frontend communicates with the backend through REST APIs.

## Responsibilities

The frontend is responsible for:

* Rendering the user interface
* Handling user interactions
* Managing client-side state
* Managing forms
* Calling APIs
* Displaying API responses
* Handling loading states
* Handling errors
* Managing navigation

The frontend should not contain critical business rules.

For example:

```text
Frontend
→ Displays the order total

Backend
→ Calculates and validates the actual order total
```

The backend remains the source of truth for business-critical operations.

---

# 4. Backend Architecture

The backend will use FastAPI.

The backend is responsible for:

* Authentication
* Authorization
* Business logic
* Data validation
* Database operations
* Order processing
* Inventory management
* Payment verification
* Security
* API responses

---

# 5. Backend Layer Architecture

The backend will follow a layered structure:

```text
HTTP Request
     ↓
API / Router Layer
     ↓
Schema / Validation Layer
     ↓
Service Layer
     ↓
Repository / Data Access Layer
     ↓
PostgreSQL
```

## 5.1 API / Router Layer

Responsible for:

* Receiving HTTP requests
* Authentication dependencies
* Request validation
* Calling services
* Returning HTTP responses

Routes should remain relatively thin.

---

## 5.2 Schema / Validation Layer

Responsible for:

* Request validation
* Response serialization
* API data contracts

Pydantic models will be used.

Examples:

```text
CreateProductRequest
UpdateProductRequest
ProductResponse
LoginRequest
OrderResponse
```

---

## 5.3 Service Layer

Contains the application's business logic.

Examples:

```text
AuthService
UserService
ProductService
CartService
OrderService
PaymentService
InventoryService
ReviewService
CouponService
```

Example order workflow:

```text
OrderService
     ↓
Validate cart
     ↓
Check inventory
     ↓
Calculate totals
     ↓
Apply discounts
     ↓
Create order
     ↓
Reserve/update inventory
     ↓
Create payment record
```

---

## 5.4 Repository / Data Access Layer

Responsible for database communication.

Examples:

```text
UserRepository
ProductRepository
OrderRepository
InventoryRepository
PaymentRepository
```

This keeps database operations separate from business logic.

---

# 6. Database Architecture

Scentora will initially use:

**PostgreSQL**

PostgreSQL is appropriate because Scentora contains strongly related transactional data such as:

* Users
* Products
* Product variants
* Inventory
* Orders
* Payments
* Addresses

A relational database provides:

* Relationships
* Constraints
* Transactions
* Data consistency
* Structured querying
* Referential integrity

---

# 7. Core Database Entities

The initial database will contain:

```text
User
Role
Permission
Address

Category
Product
ProductVariant
ProductImage
Inventory

Cart
CartItem

Wishlist
WishlistItem

Order
OrderItem

Payment

Coupon
CouponUsage

Review

Notification
```

The final schema will be determined during detailed database design.

---

# 8. User & Authentication Architecture

Scentora will use a unified user system.

```text
User
 │
 ├── Customer
 │
 └── Administrator
```

Authentication will use **JWT-based authentication**.

The system will use:

* Access tokens
* Refresh tokens
* Token expiration
* Token verification
* Role-based authorization

---

# 9. JWT Authentication Flow

The initial authentication flow will be:

```text
                    Registration
                         │
                         ▼
                  Validate Input
                         │
                         ▼
                  Hash Password
                         │
                         ▼
                    Store User
                         │
                         ▼
                       Login
                         │
                         ▼
                Verify Credentials
                         │
                         ▼
                Generate JWT Tokens
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Access Token          Refresh Token
              │                     │
              ▼                     ▼
      API Authentication      Get New Access Token
```

---

# 10. Access Token

The access token will:

* Be short-lived
* Authenticate API requests
* Identify the authenticated user
* Be cryptographically signed
* Contain required claims
* Have an expiration time

Example conceptual claims:

```text
sub      → User ID
exp      → Expiration time
iat      → Issued-at time
type     → access
```

The exact claims will be finalized during authentication implementation.

---

# 11. Refresh Token

The refresh token will:

* Have a longer lifetime than the access token
* Be used to obtain a new access token
* Be securely handled
* Support expiration
* Support revocation/rotation strategy

The exact storage and rotation strategy will be finalized during the security design phase.

---

# 12. JWT Request Flow

A protected API request will follow:

```text
Client
  │
  │ Authorization: Bearer <access_token>
  ▼
FastAPI
  │
  ▼
Extract JWT
  │
  ▼
Verify Signature
  │
  ▼
Check Expiration
  │
  ▼
Validate Claims
  │
  ▼
Identify User
  │
  ▼
Check Authorization
  │
  ▼
Execute Request
```

Invalid or expired tokens should result in an appropriate authentication error.

---

# 13. Authentication vs Authorization

These are separate concepts.

### Authentication

Answers:

> "Who are you?"

```text
JWT
 ↓
User
```

### Authorization

Answers:

> "What are you allowed to do?"

```text
User
 ↓
Role
 ↓
Permission
 ↓
Allow / Deny
```

Example:

```text
Customer
    ↓
GET /api/v1/products
    ↓
Allowed
```

But:

```text
Customer
    ↓
DELETE /api/v1/admin/products/10
    ↓
Forbidden
```

---

# 14. Role & Permission Architecture

The system will support role-based authorization.

Initial roles may include:

```text
CUSTOMER
ADMIN
SUPER_ADMIN
```

Future roles may include:

```text
STORE_MANAGER
INVENTORY_MANAGER
ORDER_MANAGER
CONTENT_MANAGER
```

Example:

```text
User
 ↓
INVENTORY_MANAGER
 ↓
MANAGE_INVENTORY
 ↓
Allowed
```

The final role and permission system will be designed during database and security planning.

---

# 15. Product Architecture

A perfume product may have multiple purchasable variants.

Example:

```text
Perfume X
│
├── 30ml
├── 50ml
└── 100ml
```

Therefore, the product and its purchasable variants will be separated.

```text
Product
    │
    ├── ProductVariant
    │      ├── 30ml
    │      ├── 50ml
    │      └── 100ml
    │
    └── ProductImage
```

A product variant may contain:

* Size
* SKU
* Price
* Stock
* Availability

---

# 16. Inventory Architecture

Inventory will be associated with the purchasable product variant.

Example:

```text
Perfume X
│
├── 30ml  → 20 units
├── 50ml  → 15 units
└── 100ml → 8 units
```

This allows accurate stock management.

---

# 17. Cart Architecture

A customer cart can contain multiple items.

```text
Cart
 │
 ├── CartItem
 │     ├── ProductVariant
 │     └── Quantity
 │
 ├── CartItem
 │     ├── ProductVariant
 │     └── Quantity
 │
 └── CartItem
       ├── ProductVariant
       └── Quantity
```

The backend will calculate authoritative totals.

---

# 18. Order Architecture

An order will contain purchased items.

```text
Order
 │
 ├── OrderItem
 │     ├── Product
 │     ├── Variant
 │     ├── Quantity
 │     └── Purchase Price
 │
 └── Payment
```

### Important principle

Orders must preserve historical information.

If a perfume costs 5,000 today and its price changes later, an old order must continue showing the original purchase price.

Therefore, relevant purchase-time information will be stored in `OrderItem`.

---

# 19. Payment Architecture

Payments will be represented separately from orders.

```text
Order
  │
  └── Payment
       │
       ├── Payment Method
       ├── Payment Status
       ├── Transaction Reference
       └── Payment Metadata
```

Possible payment statuses:

```text
PENDING
PROCESSING
PAID
FAILED
REFUNDED
```

The backend will verify payment results.

The frontend will never be trusted as the source of payment truth.

---

# 20. Review Architecture

Reviews connect users and products.

```text
User
  │
  └── Review
        │
        └── Product
```

A review may contain:

* Rating
* Comment
* User
* Product
* Verification status
* Moderation status
* Creation date

---

# 21. Promotion Architecture

Coupons will be represented separately.

```text
Coupon
 │
 ├── Code
 ├── Discount Type
 ├── Discount Value
 ├── Expiration
 ├── Usage Limit
 └── Minimum Order
```

Coupon usage may be tracked through:

```text
CouponUsage
```

---

# 22. API Architecture

The API will be versioned.

Base path:

```text
/api/v1
```

Initial modules:

```text
/api/v1/auth
/api/v1/users
/api/v1/products
/api/v1/categories
/api/v1/cart
/api/v1/wishlist
/api/v1/addresses
/api/v1/orders
/api/v1/payments
/api/v1/reviews
/api/v1/coupons
/api/v1/admin
```

---

# 23. Public vs Protected APIs

Not every endpoint requires authentication.

Example public endpoints:

```text
GET /api/v1/products
GET /api/v1/products/{id}
GET /api/v1/categories
```

Protected endpoints:

```text
GET /api/v1/users/me
POST /api/v1/cart/items
POST /api/v1/orders
GET /api/v1/orders
```

Admin-protected endpoints:

```text
POST /api/v1/admin/products
PATCH /api/v1/admin/products/{id}
DELETE /api/v1/admin/products/{id}
GET /api/v1/admin/orders
```

The exact endpoint structure will be finalized in `API.md`.

---

# 24. Error Handling

The backend will use centralized error handling.

Common HTTP responses include:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Too Many Requests
500 Internal Server Error
```

The API should return consistent error responses.

---

# 25. Configuration Management

Sensitive configuration must never be hardcoded.

Examples:

```text
DATABASE_URL
JWT_SECRET
JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_DAYS
PAYMENT_SECRET
STORAGE_CREDENTIALS
EMAIL_CREDENTIALS
```

Environment variables will be used.

Development and production configurations will remain separate.

---

# 26. Logging

The backend should log important events such as:

* Application startup
* Errors
* Failed authentication attempts
* Important administrative actions
* Payment failures
* Order processing errors

Sensitive information must never be logged.

JWTs, passwords, payment secrets, and other credentials must not appear in logs.

---

# 27. Transaction Management

Critical business operations should use database transactions.

For example, order creation may involve:

```text
Create Order
     ↓
Create Order Items
     ↓
Update Inventory
     ↓
Create Payment Record
```

If a critical operation fails, the transaction should prevent the database from being left in an inconsistent state.

---

# 28. Security Architecture

Security will be designed across the entire application.

```text
Browser
   ↓
HTTPS
   ↓
Frontend
   ↓
JWT Authentication
   ↓
Authorization
   ↓
Input Validation
   ↓
Business Logic
   ↓
Database
```

Important principles:

* Never trust client-side calculations.
* Never store plain-text passwords.
* Never expose secrets.
* Never trust payment status from the frontend.
* Validate all user input.
* Protect administrative endpoints.
* Verify JWT signatures.
* Validate JWT expiration.
* Use secure token-handling practices.

Detailed security policies will be documented in:

```text
docs/SECURITY.md
```

---

# 29. Caching & Background Processing

Redis and background workers are potential components.

Possible use cases:

### Redis

* API caching
* Session/token-related support where appropriate
* Rate limiting
* Temporary data

### Background Jobs

* Email notifications
* Image processing
* Order notifications
* Other long-running tasks

These technologies will only be introduced when there is a clear requirement.

---

# 30. Scalability Strategy

The initial architecture will remain simple.

Future scaling may include:

```text
Load Balancer
      ↓
Multiple Backend Instances
      ↓
Redis
      ↓
Background Workers
      ↓
Object Storage / CDN
      ↓
PostgreSQL
```

Microservices will only be considered if the application's scale and complexity justify them.

---

# 31. Architecture Principles

## Separation of Concerns

Each layer should have a clear responsibility.

## Single Responsibility

A module should have one primary responsibility.

## Backend as Source of Truth

Critical business rules must be enforced on the backend.

## Security by Design

Security should be considered during design rather than added at the end.

## Database Integrity

Important rules should be reinforced with database constraints where appropriate.

## Simplicity First

Do not introduce infrastructure or technologies without a justified use case.

## Testability

Business logic should be structured so that it can be tested independently.

## Maintainability

Future developers should be able to understand and modify the system without unnecessary complexity.

---

# 32. Architecture Decision Records

Important architectural decisions will be documented separately.

Directory:

```text
docs/decisions/
```

Example:

```text
ADR-001-use-postgresql.md
ADR-002-modular-monolith.md
ADR-003-jwt-authentication.md
```

Example decision:

```text
Decision:
Use JWT-based authentication.

Reason:
Scentora requires stateless API authentication between
the React frontend and FastAPI backend while supporting
short-lived access tokens and refresh tokens.
```

---

# 33. Current Architecture Status

| Area                  | Status                 |
| --------------------- | ---------------------- |
| Overall architecture  | Defined                |
| Architecture style    | Modular Monolith       |
| Frontend architecture | Defined                |
| Backend architecture  | Defined                |
| Layer architecture    | Defined                |
| Database technology   | PostgreSQL             |
| Authentication        | JWT                    |
| Access tokens         | Defined                |
| Refresh tokens        | Defined                |
| Authorization         | Role/Permission Based  |
| API versioning        | Defined                |
| Payment architecture  | Initial                |
| Security architecture | Initial                |
| Caching               | Future/Conditional     |
| Background jobs       | Future/Conditional     |
| Scalability strategy  | Defined                |
| Microservices         | Not required initially |
