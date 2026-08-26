# Scentora — Database Architecture

## 1. Database Overview

Scentora will use **PostgreSQL** as its primary relational database.

The database will be responsible for storing and maintaining the application's core business data, including:

* Users
* Roles and permissions
* Products
* Product variants
* Categories
* Inventory
* Carts
* Orders
* Payments
* Addresses
* Coupons
* Reviews
* Notifications

The database will enforce data integrity through:

* Primary keys
* Foreign keys
* Unique constraints
* Check constraints
* Not-null constraints
* Indexes
* Transactions

---

# 2. Database Design Principles

The database will follow these principles:

### Data Integrity

Important business rules should be enforced at the database level where appropriate.

### Normalization

Data should be structured to minimize unnecessary duplication while maintaining practical performance.

### Referential Integrity

Relationships between records will use foreign keys.

### Transaction Safety

Critical operations such as order creation and inventory updates should be atomic.

### Auditability

Important business events should be traceable where required.

### Scalability

The schema should support growth in products, customers, and orders.

---

# 3. Entity Overview

The initial database consists of the following entities:

```text
User
Role
Permission
UserRole
RolePermission

Address

Category
Product
ProductVariant
ProductImage

Inventory
InventoryTransaction

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

---

# 4. Entity Relationship Overview

```text
User
 │
 ├─────────────── Address
 │
 ├─────────────── Cart
 │                    │
 │                    └── CartItem ── ProductVariant
 │
 ├─────────────── Wishlist
 │                    │
 │                    └── WishlistItem ── ProductVariant
 │
 ├─────────────── Order
 │                    │
 │                    └── OrderItem ── ProductVariant
 │
 ├─────────────── Review ── Product
 │
 └─────────────── Notification


Product
 │
 ├── Category
 │
 ├── ProductImage
 │
 └── ProductVariant
        │
        └── Inventory
                │
                └── InventoryTransaction


Order
 │
 └── Payment


Coupon
 │
 └── CouponUsage


User
 │
 └── UserRole
        │
        └── Role
              │
              └── RolePermission
                    │
                    └── Permission
```

---

# 5. User

## Purpose

Stores customer and administrator accounts.

### Proposed fields

| Field         | Type      | Description         |
| ------------- | --------- | ------------------- |
| id            | UUID      | Primary key         |
| email         | VARCHAR   | Unique email        |
| password_hash | VARCHAR   | Hashed password     |
| first_name    | VARCHAR   | First name          |
| last_name     | VARCHAR   | Last name           |
| phone         | VARCHAR   | Phone number        |
| is_active     | BOOLEAN   | Account status      |
| is_verified   | BOOLEAN   | Verification status |
| created_at    | TIMESTAMP | Creation time       |
| updated_at    | TIMESTAMP | Last update         |

### Notes

Passwords will never be stored in plain text.

---

# 6. Role

## Purpose

Defines user roles.

Examples:

```text
CUSTOMER
ADMIN
SUPER_ADMIN
```

### Proposed fields

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| name        | VARCHAR   |
| description | TEXT      |
| created_at  | TIMESTAMP |

Role names should be unique.

---

# 7. Permission

## Purpose

Defines individual system permissions.

Examples:

```text
PRODUCT_CREATE
PRODUCT_UPDATE
PRODUCT_DELETE
ORDER_VIEW
ORDER_UPDATE
INVENTORY_MANAGE
USER_MANAGE
```

### Proposed fields

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| name        | VARCHAR |
| description | TEXT    |

Permission names should be unique.

---

# 8. UserRole

## Purpose

Connects users with roles.

```text
User
  ↓
UserRole
  ↓
Role
```

This allows a user to have one or multiple roles.

### Proposed fields

| Field   | Type |
| ------- | ---- |
| user_id | UUID |
| role_id | UUID |

Composite uniqueness:

```text
(user_id, role_id)
```

---

# 9. RolePermission

Connects roles with permissions.

```text
Role
  ↓
RolePermission
  ↓
Permission
```

### Proposed fields

| Field         | Type |
| ------------- | ---- |
| role_id       | UUID |
| permission_id | UUID |

Composite uniqueness:

```text
(role_id, permission_id)
```

---

# 10. Address

## Purpose

Stores customer shipping addresses.

### Proposed fields

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| user_id      | UUID      |
| full_name    | VARCHAR   |
| phone        | VARCHAR   |
| address_line | TEXT      |
| city         | VARCHAR   |
| area         | VARCHAR   |
| postal_code  | VARCHAR   |
| country      | VARCHAR   |
| is_default   | BOOLEAN   |
| created_at   | TIMESTAMP |
| updated_at   | TIMESTAMP |

One user can have multiple addresses.

```text
User
 │
 ├── Address
 ├── Address
 └── Address
```

---

# 11. Category

## Purpose

Organizes products.

Example:

```text
Perfumes
├── Men
├── Women
└── Unisex
```

### Proposed fields

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| name        | VARCHAR   |
| slug        | VARCHAR   |
| description | TEXT      |
| image_url   | VARCHAR   |
| is_active   | BOOLEAN   |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

Category names/slugs should follow appropriate uniqueness rules.

---

# 12. Product

## Purpose

Stores general information about a perfume.

### Proposed fields

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| category_id      | UUID      |
| name             | VARCHAR   |
| slug             | VARCHAR   |
| description      | TEXT      |
| brand            | VARCHAR   |
| fragrance_family | VARCHAR   |
| gender           | VARCHAR   |
| is_featured      | BOOLEAN   |
| is_active        | BOOLEAN   |
| created_at       | TIMESTAMP |
| updated_at       | TIMESTAMP |

The exact perfume-specific fields may change after business requirements are confirmed.

---

# 13. ProductVariant

## Purpose

Represents a purchasable version of a product.

Example:

```text
Perfume X
├── 30ml
├── 50ml
└── 100ml
```

### Proposed fields

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| product_id       | UUID      |
| size             | VARCHAR   |
| sku              | VARCHAR   |
| price            | DECIMAL   |
| compare_at_price | DECIMAL   |
| is_active        | BOOLEAN   |
| created_at       | TIMESTAMP |
| updated_at       | TIMESTAMP |

Each variant should have a unique SKU.

---

# 14. ProductImage

## Purpose

Stores product image references.

### Proposed fields

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| product_id    | UUID      |
| image_url     | TEXT      |
| alt_text      | VARCHAR   |
| display_order | INTEGER   |
| is_primary    | BOOLEAN   |
| created_at    | TIMESTAMP |

Images themselves may be stored in external object storage rather than PostgreSQL.

---

# 15. Inventory

## Purpose

Stores the current stock level of a product variant.

### Proposed fields

| Field               | Type      |
| ------------------- | --------- |
| id                  | UUID      |
| variant_id          | UUID      |
| quantity            | INTEGER   |
| reserved_quantity   | INTEGER   |
| low_stock_threshold | INTEGER   |
| updated_at          | TIMESTAMP |

The available quantity can conceptually be:

```text
Available Stock
=
Quantity - Reserved Quantity
```

The exact reservation strategy will be finalized during order implementation.

---

# 16. InventoryTransaction

## Purpose

Provides a history of inventory changes.

Examples:

```text
STOCK_IN
SALE
RETURN
ADJUSTMENT
DAMAGE
```

### Proposed fields

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| variant_id       | UUID      |
| quantity_change  | INTEGER   |
| transaction_type | VARCHAR   |
| reference_type   | VARCHAR   |
| reference_id     | UUID      |
| note             | TEXT      |
| created_by       | UUID      |
| created_at       | TIMESTAMP |

This provides an audit trail for inventory changes.

---

# 17. Cart

## Purpose

Represents a customer's shopping cart.

### Proposed fields

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

A user should normally have one active cart.

---

# 18. CartItem

## Purpose

Stores products inside a cart.

### Proposed fields

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| cart_id    | UUID      |
| variant_id | UUID      |
| quantity   | INTEGER   |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

A cart should not contain duplicate entries for the same variant.

---

# 19. Wishlist

## Purpose

Stores a customer's saved products.

### Proposed fields

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| created_at | TIMESTAMP |

---

# 20. WishlistItem

### Proposed fields

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| wishlist_id | UUID      |
| variant_id  | UUID      |
| created_at  | TIMESTAMP |

Duplicate wishlist items should be prevented.

---

# 21. Order

## Purpose

Represents a completed or pending purchase.

### Proposed fields

| Field                | Type      |
| -------------------- | --------- |
| id                   | UUID      |
| user_id              | UUID      |
| order_number         | VARCHAR   |
| status               | VARCHAR   |
| payment_status       | VARCHAR   |
| shipping_name        | VARCHAR   |
| shipping_phone       | VARCHAR   |
| shipping_address     | TEXT      |
| shipping_city        | VARCHAR   |
| shipping_area        | VARCHAR   |
| shipping_postal_code | VARCHAR   |
| subtotal             | DECIMAL   |
| discount_amount      | DECIMAL   |
| delivery_fee         | DECIMAL   |
| total_amount         | DECIMAL   |
| coupon_code          | VARCHAR   |
| notes                | TEXT      |
| created_at           | TIMESTAMP |
| updated_at           | TIMESTAMP |

---

# 22. OrderItem

## Purpose

Stores the products purchased in an order.

### Proposed fields

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| order_id     | UUID    |
| product_id   | UUID    |
| variant_id   | UUID    |
| product_name | VARCHAR |
| variant_name | VARCHAR |
| sku          | VARCHAR |
| unit_price   | DECIMAL |
| quantity     | INTEGER |
| subtotal     | DECIMAL |

### Important Principle

Order items store purchase-time information.

This protects historical order data when:

* Product names change
* Product prices change
* Products are deleted
* Product variants change

---

# 23. Payment

## Purpose

Stores payment information related to an order.

### Proposed fields

| Field                 | Type      |
| --------------------- | --------- |
| id                    | UUID      |
| order_id              | UUID      |
| payment_method        | VARCHAR   |
| status                | VARCHAR   |
| amount                | DECIMAL   |
| transaction_reference | VARCHAR   |
| provider              | VARCHAR   |
| provider_payment_id   | VARCHAR   |
| metadata              | JSONB     |
| created_at            | TIMESTAMP |
| updated_at            | TIMESTAMP |

Sensitive payment information must not be stored unnecessarily.

---

# 24. Coupon

## Purpose

Defines promotional discount codes.

### Proposed fields

| Field                   | Type      |
| ----------------------- | --------- |
| id                      | UUID      |
| code                    | VARCHAR   |
| discount_type           | VARCHAR   |
| discount_value          | DECIMAL   |
| minimum_order_amount    | DECIMAL   |
| maximum_discount_amount | DECIMAL   |
| usage_limit             | INTEGER   |
| usage_count             | INTEGER   |
| starts_at               | TIMESTAMP |
| expires_at              | TIMESTAMP |
| is_active               | BOOLEAN   |
| created_at              | TIMESTAMP |
| updated_at              | TIMESTAMP |

---

# 25. CouponUsage

## Purpose

Tracks coupon usage.

### Proposed fields

| Field     | Type      |
| --------- | --------- |
| id        | UUID      |
| coupon_id | UUID      |
| user_id   | UUID      |
| order_id  | UUID      |
| used_at   | TIMESTAMP |

This allows the system to enforce usage rules.

---

# 26. Review

## Purpose

Stores customer product reviews.

### Proposed fields

| Field                | Type      |
| -------------------- | --------- |
| id                   | UUID      |
| user_id              | UUID      |
| product_id           | UUID      |
| order_id             | UUID      |
| rating               | INTEGER   |
| title                | VARCHAR   |
| comment              | TEXT      |
| is_verified_purchase | BOOLEAN   |
| status               | VARCHAR   |
| created_at           | TIMESTAMP |
| updated_at           | TIMESTAMP |

A review should be associated with a real purchase when implementing verified reviews.

---

# 27. Notification

## Purpose

Stores user notifications.

### Proposed fields

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| type       | VARCHAR   |
| title      | VARCHAR   |
| message    | TEXT      |
| is_read    | BOOLEAN   |
| created_at | TIMESTAMP |

Examples:

```text
ORDER_CONFIRMED
ORDER_SHIPPED
ORDER_DELIVERED
PAYMENT_SUCCESS
```

---

# 28. Entity Relationships

## User Relationships

```text
User 1 ──── N Address
User 1 ──── N Order
User 1 ──── 1 Cart
User 1 ──── 1 Wishlist
User 1 ──── N Review
User 1 ──── N Notification
User N ──── N Role
```

## Product Relationships

```text
Category 1 ──── N Product

Product 1 ──── N ProductVariant
Product 1 ──── N ProductImage
Product 1 ──── N Review

ProductVariant 1 ──── 1 Inventory
ProductVariant 1 ──── N InventoryTransaction
```

## Order Relationships

```text
Order 1 ──── N OrderItem
Order 1 ──── 1 Payment
Order N ──── 1 User
```

## Coupon Relationships

```text
Coupon 1 ──── N CouponUsage
User 1 ──── N CouponUsage
Order 1 ──── 0..1 CouponUsage
```

---

# 29. Primary Key Strategy

Scentora will use **UUIDs** as primary keys for major entities.

Advantages:

* Globally unique identifiers
* Better suited to distributed systems
* Less predictable than sequential IDs
* Easier future integration with external systems

Human-readable identifiers such as order numbers will be separate.

Example:

```text
Database ID:
550e8400-e29b-41d4-a716-446655440000

Order Number:
SCN-2026-000001
```

---

# 30. Money Representation

Monetary values will use fixed-precision decimal types.

Example:

```text
DECIMAL(12,2)
```

Floating-point values should not be used for financial calculations.

---

# 31. Timestamp Strategy

Major entities will include timestamps.

Standard fields:

```text
created_at
updated_at
```

Timestamps should be stored consistently, preferably using UTC at the database/application level.

---

# 32. Soft Deletion

Soft deletion may be used for entities where historical records must remain intact.

For example, products may become:

```text
is_active = false
```

rather than being physically deleted.

Orders and payments should generally never be physically deleted as part of normal business operations.

---

# 33. Database Indexing

Indexes will be created for frequently queried fields.

Potential indexes:

```text
User.email
Product.slug
Product.category_id
ProductVariant.sku
Order.order_number
Order.user_id
Order.status
Order.created_at
Payment.transaction_reference
Coupon.code
Review.product_id
```

Indexes will be added based on actual query patterns rather than indiscriminately indexing every column.

---

# 34. Database Constraints

Examples:

### User

```text
email UNIQUE
```

### Product

```text
slug UNIQUE
```

### Product Variant

```text
sku UNIQUE
```

### Cart Item

```text
(cart_id, variant_id) UNIQUE
```

### Wishlist Item

```text
(wishlist_id, variant_id) UNIQUE
```

### Coupon

```text
code UNIQUE
```

Constraints will be finalized during SQLAlchemy model implementation.

---

# 35. Order State

Initial order states:

```text
PENDING
CONFIRMED
PROCESSING
SHIPPED
DELIVERED
CANCELLED
RETURNED
REFUNDED
```

Valid transitions will be defined in the business logic.

The application should prevent invalid state transitions.

---

# 36. Payment State

Initial payment states:

```text
PENDING
PROCESSING
PAID
FAILED
REFUNDED
```

Payment status must be updated through trusted backend/payment-provider workflows.

---

# 37. Inventory Consistency

Inventory operations are critical.

The system must prevent:

```text
Available Stock = 0

Customer A → buys 1
Customer B → buys 1
```

from resulting in negative stock.

Inventory updates should use appropriate database transactions and concurrency controls.

The exact strategy will be determined during order implementation.

---

# 38. Database Migration

Database schema changes will be managed using **Alembic**.

Development workflow:

```text
Change Model
    ↓
Create Migration
    ↓
Review Migration
    ↓
Run Migration
    ↓
Test
```

Migrations will be committed to Git.

---

# 39. Database Backup Strategy

Production PostgreSQL should have:

* Automated backups
* Point-in-time recovery where supported
* Backup retention policy
* Recovery testing

Database backups must never be considered a substitute for proper application security.

---

# 40. Database Security

The application should:

* Use a dedicated database user.
* Store credentials in environment variables.
* Restrict database network access.
* Use encrypted database connections where appropriate.
* Never expose PostgreSQL directly to the public internet unnecessarily.
* Never log database passwords.

---

# 41. Future Considerations

The database may later evolve to support:

* Multiple warehouses
* Multiple currencies
* Tax management
* Product brands
* Fragrance notes
* Product collections
* Loyalty points
* Gift cards
* Subscriptions
* Advanced analytics
* Multiple shipping providers

These should not be added to the initial schema unless requirements justify them.

---

# 42. Current Database Status

| Area              | Status     |
| ----------------- | ---------- |
| Database          | PostgreSQL |
| ORM               | SQLAlchemy |
| Migrations        | Alembic    |
| Primary keys      | UUID       |
| Money             | DECIMAL    |
| User system       | Defined    |
| RBAC              | Defined    |
| Products          | Defined    |
| Variants          | Defined    |
| Inventory         | Defined    |
| Cart              | Defined    |
| Wishlist          | Defined    |
| Orders            | Defined    |
| Payments          | Defined    |
| Coupons           | Defined    |
| Reviews           | Defined    |
| Notifications     | Defined    |
| Index strategy    | Initial    |
| Constraints       | Initial    |
| ERD               | Initial    |
| Production backup | Planned    |

