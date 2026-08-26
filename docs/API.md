# Scentora — API Architecture

## 1. API Overview

Scentora will expose a RESTful API that allows the frontend and other authorized clients to communicate with the backend.

The API will be built using **FastAPI** and will follow consistent conventions for:

* URL structure
* HTTP methods
* Request validation
* Response formats
* Authentication
* Authorization
* Error handling
* Pagination
* Filtering
* Sorting
* API versioning

Base URL:

```text
/api/v1
```

---

# 2. API Design Principles

The API will follow these principles:

* RESTful resource-based URLs
* Consistent HTTP methods
* JSON request/response format
* API versioning
* JWT authentication
* Role-based authorization
* Pydantic validation
* Consistent error responses
* Pagination for large collections
* Proper HTTP status codes
* Backend as the source of truth
* No sensitive information in responses

---

# 3. Base API Structure

All endpoints will be grouped under:

```text
/api/v1
```

Example:

```text
GET /api/v1/products
```

Future versions may use:

```text
/api/v2
```

The API version should allow future changes without unexpectedly breaking existing clients.

---

# 4. HTTP Methods

The API will primarily use:

| Method | Purpose                                |
| ------ | -------------------------------------- |
| GET    | Retrieve data                          |
| POST   | Create a resource or perform an action |
| PUT    | Replace a resource                     |
| PATCH  | Partially update a resource            |
| DELETE | Remove/deactivate a resource           |

Example:

```text
GET    /api/v1/products
POST   /api/v1/admin/products
GET    /api/v1/products/{product_id}
PATCH  /api/v1/admin/products/{product_id}
DELETE /api/v1/admin/products/{product_id}
```

---

# 5. HTTP Status Codes

The API will use appropriate HTTP status codes.

### Success

```text
200 OK
201 Created
204 No Content
```

### Client Errors

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
```

### Server Errors

```text
500 Internal Server Error
503 Service Unavailable
```

---

# 6. Authentication Architecture

Scentora will use **JWT-based authentication**.

Authentication will use:

* Access tokens
* Refresh tokens
* Token expiration
* JWT signature verification
* Authentication dependencies
* Role/permission authorization

---

# 7. JWT Authentication Flow

```text
                    LOGIN
                      │
                      ▼
              Verify Credentials
                      │
                      ▼
                Generate JWT
                 /       \
                /         \
               ▼           ▼
        Access Token    Refresh Token
               │           │
               │           │
               ▼           ▼
        API Requests   Token Refresh
```

---

# 8. Login

### Endpoint

```text
POST /api/v1/auth/login
```

### Request

```json
{
  "email": "customer@example.com",
  "password": "password"
}
```

### Response

```json
{
  "access_token": "JWT_ACCESS_TOKEN",
  "refresh_token": "JWT_REFRESH_TOKEN",
  "token_type": "bearer",
  "expires_in": 900
}
```

The actual token expiration configuration will be defined through environment configuration.

---

# 9. Access Token

The access token will:

* Be short-lived
* Authenticate API requests
* Identify the user
* Be cryptographically signed
* Contain an expiration time

Conceptual claims:

```text
sub
iat
exp
type
```

The frontend will use the access token when calling protected endpoints.

Example:

```http
Authorization: Bearer <access_token>
```

---

# 10. Refresh Token

### Endpoint

```text
POST /api/v1/auth/refresh
```

The refresh process:

```text
Refresh Token
      ↓
Verify Token
      ↓
Validate Expiration
      ↓
Validate Session / Revocation
      ↓
Generate New Access Token
      ↓
Return Access Token
```

The exact refresh-token storage and rotation strategy will be defined in the security implementation.

---

# 11. Logout

### Endpoint

```text
POST /api/v1/auth/logout
```

Logout should invalidate/revoke the appropriate authentication session or refresh token.

JWTs should not simply be assumed to be invalid because the client deleted them.

---

# 12. Registration

### Endpoint

```text
POST /api/v1/auth/register
```

### Request

```json
{
  "first_name": "Nazmul",
  "last_name": "Tuhin",
  "email": "customer@example.com",
  "phone": "+8801XXXXXXXXX",
  "password": "secure-password"
}
```

### Response

```json
{
  "message": "Account created successfully"
}
```

Passwords must never be returned.

---

# 13. Current User

### Endpoint

```text
GET /api/v1/users/me
```

Authentication:

```text
Required
```

Returns information about the currently authenticated user.

Example:

```json
{
  "id": "uuid",
  "email": "customer@example.com",
  "first_name": "Nazmul",
  "last_name": "Tuhin",
  "roles": [
    "CUSTOMER"
  ]
}
```

---

# 14. Product APIs

Products are publicly accessible unless otherwise specified.

## List Products

```text
GET /api/v1/products
```

Supports:

* Search
* Filtering
* Sorting
* Pagination
* Category filtering
* Price filtering
* Availability filtering

Example:

```text
GET /api/v1/products?page=1&limit=20
```

---

## Get Product

```text
GET /api/v1/products/{product_id}
```

Returns:

* Product information
* Images
* Variants
* Availability
* Category
* Rating information

---

## Search Products

Search will be implemented through the product listing endpoint.

Example:

```text
GET /api/v1/products?search=oud
```

---

# 15. Category APIs

## List Categories

```text
GET /api/v1/categories
```

## Get Category

```text
GET /api/v1/categories/{category_id}
```

## Category Products

```text
GET /api/v1/categories/{category_id}/products
```

---

# 16. Cart APIs

Cart endpoints require authentication.

## Get Cart

```text
GET /api/v1/cart
```

## Add Item

```text
POST /api/v1/cart/items
```

Request:

```json
{
  "variant_id": "uuid",
  "quantity": 1
}
```

## Update Item

```text
PATCH /api/v1/cart/items/{item_id}
```

Request:

```json
{
  "quantity": 2
}
```

## Remove Item

```text
DELETE /api/v1/cart/items/{item_id}
```

---

# 17. Wishlist APIs

Authentication required.

## Get Wishlist

```text
GET /api/v1/wishlist
```

## Add Item

```text
POST /api/v1/wishlist/items
```

Request:

```json
{
  "variant_id": "uuid"
}
```

## Remove Item

```text
DELETE /api/v1/wishlist/items/{item_id}
```

---

# 18. Address APIs

Authentication required.

## List Addresses

```text
GET /api/v1/addresses
```

## Create Address

```text
POST /api/v1/addresses
```

## Get Address

```text
GET /api/v1/addresses/{address_id}
```

## Update Address

```text
PATCH /api/v1/addresses/{address_id}
```

## Delete Address

```text
DELETE /api/v1/addresses/{address_id}
```

---

# 19. Order APIs

Authentication required.

## Create Order

```text
POST /api/v1/orders
```

The backend will:

```text
Validate Cart
     ↓
Validate Stock
     ↓
Calculate Prices
     ↓
Apply Discount
     ↓
Calculate Delivery
     ↓
Create Order
     ↓
Create Order Items
     ↓
Process Inventory
     ↓
Create Payment
```

The backend must calculate the final amount rather than trusting the frontend.

---

## List Orders

```text
GET /api/v1/orders
```

Supports:

* Pagination
* Status filtering
* Date filtering

---

## Get Order

```text
GET /api/v1/orders/{order_id}
```

Customers may only access their own orders.

---

## Cancel Order

```text
POST /api/v1/orders/{order_id}/cancel
```

The backend will determine whether the order is eligible for cancellation.

---

# 20. Payment APIs

## Create Payment

```text
POST /api/v1/payments
```

The exact implementation will depend on the selected payment provider.

## Get Payment

```text
GET /api/v1/payments/{payment_id}
```

## Payment Callback/Webhook

```text
POST /api/v1/payments/webhook
```

Payment-provider webhooks are trusted only after proper signature/authentication verification.

The frontend must never directly determine whether a payment succeeded.

---

# 21. Review APIs

## List Product Reviews

```text
GET /api/v1/products/{product_id}/reviews
```

## Create Review

```text
POST /api/v1/products/{product_id}/reviews
```

## Update Review

```text
PATCH /api/v1/reviews/{review_id}
```

## Delete Review

```text
DELETE /api/v1/reviews/{review_id}
```

The backend should verify whether the user is allowed to review the product.

---

# 22. Coupon APIs

## Validate Coupon

```text
POST /api/v1/coupons/validate
```

Example:

```json
{
  "code": "WELCOME10"
}
```

The backend determines whether:

* Coupon exists
* Coupon is active
* Coupon has expired
* User is eligible
* Minimum order is satisfied
* Usage limit is available

The frontend should not calculate coupon validity itself.

---

# 23. Admin API

All admin endpoints require:

```text
Authentication
+
Authorization
```

---

# 24. Admin Product APIs

## Create Product

```text
POST /api/v1/admin/products
```

## Update Product

```text
PATCH /api/v1/admin/products/{product_id}
```

## Delete Product

```text
DELETE /api/v1/admin/products/{product_id}
```

## Manage Product Images

```text
POST   /api/v1/admin/products/{product_id}/images
DELETE /api/v1/admin/products/{product_id}/images/{image_id}
```

---

# 25. Admin Category APIs

```text
POST   /api/v1/admin/categories
PATCH  /api/v1/admin/categories/{category_id}
DELETE /api/v1/admin/categories/{category_id}
```

---

# 26. Admin Inventory APIs

## View Inventory

```text
GET /api/v1/admin/inventory
```

## Update Inventory

```text
PATCH /api/v1/admin/inventory/{variant_id}
```

## Inventory History

```text
GET /api/v1/admin/inventory/{variant_id}/transactions
```

---

# 27. Admin Order APIs

## List Orders

```text
GET /api/v1/admin/orders
```

Supports:

* Search
* Status filtering
* Payment filtering
* Date filtering
* Pagination

## Get Order

```text
GET /api/v1/admin/orders/{order_id}
```

## Update Order Status

```text
PATCH /api/v1/admin/orders/{order_id}/status
```

Example:

```json
{
  "status": "SHIPPED"
}
```

The backend must validate state transitions.

---

# 28. Admin Customer APIs

## List Customers

```text
GET /api/v1/admin/customers
```

## Get Customer

```text
GET /api/v1/admin/customers/{user_id}
```

## Customer Orders

```text
GET /api/v1/admin/customers/{user_id}/orders
```

---

# 29. Admin Dashboard API

```text
GET /api/v1/admin/dashboard
```

Possible response:

```json
{
  "total_revenue": 0,
  "total_orders": 0,
  "pending_orders": 0,
  "total_customers": 0,
  "total_products": 0,
  "low_stock_products": 0
}
```

More advanced analytics will be added later.

---

# 30. Pagination

Large collections will use pagination.

Example:

```text
GET /api/v1/products?page=2&limit=20
```

Example response:

```json
{
  "items": [],
  "page": 2,
  "limit": 20,
  "total": 100,
  "total_pages": 5
}
```

The final pagination response structure will be standardized during implementation.

---

# 31. Filtering

Filtering will use query parameters.

Example:

```text
GET /api/v1/products?category=men
```

Multiple filters:

```text
GET /api/v1/products?category=men&min_price=1000&max_price=5000
```

---

# 32. Sorting

Example:

```text
GET /api/v1/products?sort=price_asc
```

Possible sorting options:

```text
price_asc
price_desc
newest
popular
rating
```

The backend should validate supported sorting values.

---

# 33. Search

Example:

```text
GET /api/v1/products?search=oud
```

Search implementation may initially use PostgreSQL queries.

Advanced search may later use a dedicated search engine if justified.

---

# 34. Standard Response Format

Successful responses should follow consistent structures.

Example:

```json
{
  "data": {},
  "message": "Success"
}
```

For collections:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

The exact response envelope will be finalized before implementation.

---

# 35. Error Response Format

Errors should follow a consistent structure.

Example:

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product not found",
    "details": null
  }
}
```

Validation errors may include field-level information.

Example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {
      "email": [
        "Invalid email address"
      ]
    }
  }
}
```

---

# 36. Authentication Requirements

| Endpoint Type           | Authentication   |
| ----------------------- | ---------------- |
| Public product browsing | Not required     |
| Product details         | Not required     |
| Registration            | Not required     |
| Login                   | Not required     |
| Cart                    | Required         |
| Wishlist                | Required         |
| Addresses               | Required         |
| Orders                  | Required         |
| Payments                | Required         |
| Reviews                 | Required         |
| Admin products          | Admin permission |
| Admin orders            | Admin permission |
| Admin inventory         | Admin permission |
| Admin dashboard         | Admin permission |

---

# 37. Authorization

Authentication determines the user.

Authorization determines what the user can do.

Example:

```text
JWT
 ↓
User ID
 ↓
Roles
 ↓
Permissions
 ↓
Endpoint Access
```

The API must never rely only on frontend route protection for authorization.

---

# 38. API Security

The API will implement:

* HTTPS in production
* JWT verification
* Access-token expiration
* Refresh-token security
* Input validation
* Authorization checks
* Rate limiting where appropriate
* CORS configuration
* Secure headers where appropriate
* File-upload validation
* Consistent error handling
* No sensitive data exposure

Detailed security policies will be documented in:

```text
docs/SECURITY.md
```

---

# 39. API Documentation

FastAPI will automatically generate API documentation.

Development documentation:

```text
/docs
```

Alternative documentation:

```text
/redoc
```

The API documentation will be used during development and testing.

---

# 40. API Testing

Each major API module should have automated tests.

Testing levels will include:

### Unit Tests

Test individual pieces of business logic.

### Integration Tests

Test interaction between:

```text
API
 ↓
Service
 ↓
Database
```

### API Tests

Test actual HTTP endpoints.

Important scenarios include:

* Successful requests
* Invalid requests
* Unauthorized requests
* Forbidden requests
* Missing resources
* Duplicate resources
* Invalid state transitions
* Insufficient inventory
* Failed payments

---

# 41. API Naming Conventions

Use plural resource names:

```text
/products
/orders
/users
/categories
/reviews
```

Use resource IDs for individual resources:

```text
/products/{product_id}
/orders/{order_id}
```

Avoid unnecessary verbs in URLs.

Prefer:

```text
PATCH /products/{id}
```

instead of:

```text
POST /updateProduct
```

Actions that do not map naturally to CRUD may use action endpoints.

Example:

```text
POST /orders/{id}/cancel
POST /auth/refresh
POST /auth/logout
```

---

# 42. API Design Status

| Area              | Status  |
| ----------------- | ------- |
| REST architecture | Defined |
| API versioning    | Defined |
| Authentication    | JWT     |
| Access tokens     | Defined |
| Refresh tokens    | Defined |
| Authorization     | Defined |
| Product APIs      | Initial |
| Cart APIs         | Initial |
| Order APIs        | Initial |
| Payment APIs      | Initial |
| Admin APIs        | Initial |
| Pagination        | Defined |
| Filtering         | Defined |
| Sorting           | Defined |
| Error format      | Initial |
| Testing strategy  | Defined |
| API documentation | Defined |
