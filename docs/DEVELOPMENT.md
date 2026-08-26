# Scentora — Development Architecture

## 1. Development Overview

Scentora will be developed as a production-oriented full-stack e-commerce application.

The project will use a monorepo structure containing:

```text
frontend/
backend/
docs/
```

The architecture will keep frontend and backend responsibilities clearly separated while allowing them to be developed and deployed independently.

---

# 2. Technology Stack

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
React Router
TanStack Query
Axios
React Hook Form
Zod
```

## Backend

```text
Python
FastAPI
SQLAlchemy
Pydantic
Alembic
PostgreSQL
JWT
```

## Development Tools

```text
Git
GitHub
Docker
Docker Compose
VS Code
Postman
pytest
ESLint
Prettier
Ruff
```

The exact library versions will be pinned during project initialization.

---

# 3. Repository Structure

The initial repository structure:

```text
scentora/
│
├── frontend/
│
├── backend/
│
├── docs/
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

# 4. Frontend Structure

The frontend will follow a feature-oriented architecture.

```text
frontend/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── common/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── checkout/
│   │   ├── orders/
│   │   └── reviews/
│   │
│   ├── pages/
│   │   ├── customer/
│   │   └── admin/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

---

# 5. Backend Structure

The backend will use a layered architecture.

```text
backend/
│
├── app/
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── auth/
│   │       ├── users/
│   │       ├── products/
│   │       ├── categories/
│   │       ├── cart/
│   │       ├── wishlist/
│   │       ├── orders/
│   │       ├── payments/
│   │       ├── reviews/
│   │       ├── coupons/
│   │       └── admin/
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   │
│   ├── db/
│   │   ├── session.py
│   │   ├── base.py
│   │   └── models/
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   ├── repositories/
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── alembic/
├── alembic.ini
├── pyproject.toml
├── Dockerfile
└── .env.example
```

---

# 6. Backend Layer Responsibilities

The backend will separate responsibilities into layers.

```text
Router
   ↓
Schema Validation
   ↓
Service
   ↓
Repository
   ↓
Database
```

## Router

Responsible for:

* HTTP requests
* HTTP responses
* Authentication dependencies
* Calling services

Routers should contain minimal business logic.

---

## Schema

Responsible for:

* Request validation
* Response serialization
* Data shape

Pydantic will be used for schemas.

---

## Service

Responsible for:

* Business logic
* Order calculations
* Inventory rules
* Coupon validation
* Authentication logic
* Payment workflows

---

## Repository

Responsible for:

* Database queries
* Creating records
* Updating records
* Deleting records
* Retrieving records

---

## Database

PostgreSQL will persist the application's data.

SQLAlchemy will provide ORM/database access.

---

# 7. Authentication Architecture

Authentication will be implemented using JWT.

The system will contain:

```text
Access Token
Refresh Token
Password Hashing
Token Validation
Token Expiration
Authentication Dependencies
Authorization Dependencies
```

Authentication flow:

```text
Login
  ↓
Verify Password
  ↓
Generate Tokens
  ↓
Client Receives Tokens
  ↓
Access Protected API
  ↓
JWT Verification
  ↓
User Identification
  ↓
Authorization
```

JWT implementation details are documented in:

```text
docs/API.md
docs/SECURITY.md
```

---

# 8. Password Security

Passwords will never be stored directly.

The backend will store password hashes using a modern password-hashing algorithm.

Conceptually:

```text
Password
   ↓
Hashing Algorithm
   ↓
Password Hash
   ↓
Database
```

During login:

```text
Password
   ↓
Verify Against Hash
   ↓
Success / Failure
```

---

# 9. Environment Configuration

Sensitive configuration will never be committed to Git.

Example:

```text
DATABASE_URL=
JWT_SECRET_KEY=
JWT_ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
REFRESH_TOKEN_EXPIRE_DAYS=
CORS_ORIGINS=
PAYMENT_SECRET_KEY=
```

Environment files:

```text
.env
.env.example
```

`.env` must be excluded from Git.

---

# 10. Configuration Management

Application configuration will be centralized.

Example conceptual structure:

```text
app/core/config.py
```

Configuration should include:

```text
Application settings
Database settings
JWT settings
CORS settings
External service settings
Payment settings
```

Production values must be supplied through environment variables or a secure secret-management system.

---

# 11. Database Development

SQLAlchemy will be used as the ORM.

Alembic will manage schema migrations.

Development flow:

```text
Modify Model
     ↓
Create Migration
     ↓
Review Migration
     ↓
Run Migration
     ↓
Test
```

Migration files must be committed to Git.

---

# 12. API Development Workflow

Each backend feature will generally follow:

```text
Requirement
    ↓
Database Model
    ↓
Pydantic Schema
    ↓
Repository
    ↓
Service
    ↓
API Router
    ↓
Tests
    ↓
Frontend Integration
```

This workflow prevents randomly writing endpoints without understanding the underlying architecture.

---

# 13. Frontend API Communication

The frontend will communicate with FastAPI through HTTP requests.

Conceptually:

```text
React
  ↓
API Client
  ↓
FastAPI
  ↓
Service
  ↓
PostgreSQL
```

Axios will be used as the HTTP client unless implementation testing indicates another approach is preferable.

---

# 14. Server State

Remote API data will be managed separately from local UI state.

Examples of server state:

```text
Products
Cart
Orders
User Profile
Reviews
Inventory
```

TanStack Query will be used to manage:

* Fetching
* Caching
* Refetching
* Loading states
* Error states
* Mutations
* Cache invalidation

---

# 15. Form Architecture

Forms will use:

```text
React Hook Form
+
Zod
```

Frontend validation provides immediate feedback.

Backend validation remains authoritative.

Example:

```text
Frontend Validation
        ↓
User Experience
        ↓
HTTP Request
        ↓
Backend Validation
        ↓
Business Rules
```

---

# 16. Error Handling

Errors will be handled consistently across the application.

Frontend:

```text
API Error
   ↓
Error Handler
   ↓
User-Friendly Message
```

Backend:

```text
Exception
   ↓
Exception Handler
   ↓
Standard API Error
   ↓
HTTP Response
```

Technical implementation details must not unnecessarily leak to customers.

---

# 17. Logging

The backend will implement structured logging.

Important events may include:

```text
Authentication events
Order creation
Payment events
Inventory changes
Unexpected exceptions
Administrative actions
```

Sensitive information must not be logged.

Never log:

```text
Passwords
JWT secrets
Payment secrets
Sensitive credentials
```

---

# 18. Testing Strategy

Testing will be part of development rather than something added at the end.

## Backend

```text
Unit Tests
Integration Tests
API Tests
```

## Frontend

```text
Component Tests
Integration Tests
```

## End-to-End

Important customer flows should eventually be tested end-to-end.

Example:

```text
Register
 ↓
Login
 ↓
Browse Product
 ↓
Add to Cart
 ↓
Checkout
 ↓
Create Order
```

---

# 19. Code Quality

## Python

Use:

```text
Ruff
```

for linting and formatting.

Use type hints throughout the backend.

---

## TypeScript

Use:

```text
ESLint
Prettier
```

Maintain strict TypeScript configuration.

Avoid unnecessary use of:

```text
any
```

---

# 20. Git Strategy

Git will be used for version control.

Main branches:

```text
main
develop
```

Feature branches:

```text
feature/authentication
feature/product-catalog
feature/cart
feature/checkout
feature/admin-dashboard
```

Bug fixes:

```text
fix/cart-total
fix/login-validation
```

---

# 21. Commit Convention

Commits should be meaningful and consistent.

Examples:

```text
feat: add user registration
feat: implement product listing API
feat: add shopping cart
fix: prevent duplicate cart items
refactor: separate order service
test: add authentication tests
docs: update API documentation
chore: configure linting
```

Avoid commits such as:

```text
update
changes
final
final2
working
```

---

# 22. Pull Request Strategy

Even when working alone, the project should follow professional pull-request habits.

A feature should ideally go through:

```text
Feature Branch
      ↓
Implementation
      ↓
Tests
      ↓
Self Review
      ↓
Pull Request
      ↓
Merge
```

This creates professional GitHub history that can also strengthen the project's CV value.

---

# 23. Docker Strategy

Docker will be used to make the development environment reproducible.

Initial services:

```text
frontend
backend
postgres
```

Potential future services:

```text
redis
object storage
reverse proxy
```

Services will only be added when they provide actual value.

---

# 24. Local Development

Expected development workflow:

```text
Clone Repository
      ↓
Configure Environment
      ↓
Start PostgreSQL
      ↓
Run Database Migrations
      ↓
Start Backend
      ↓
Start Frontend
      ↓
Open Application
```

---

# 25. API Development Environment

Development API:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

Frontend development server will use the Vite development server.

The exact port will be defined during project initialization.

---

# 26. CORS

FastAPI will configure CORS to allow only trusted frontend origins.

Development may allow:

```text
localhost
```

Production will use the actual Scentora frontend domain.

Wildcard CORS should not be used unnecessarily in production.

---

# 27. File Upload Architecture

Product images will not be stored directly inside PostgreSQL.

Instead:

```text
Admin
 ↓
Upload Image
 ↓
Object/File Storage
 ↓
Image URL
 ↓
PostgreSQL
```

The database stores metadata and references.

Image storage provider will be selected before implementing product image uploads.

---

# 28. Deployment Architecture

The initial production architecture is expected to be:

```text
                    Internet
                       │
                       ▼
                Frontend Hosting
                       │
                       │ HTTPS
                       ▼
                 FastAPI Backend
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        PostgreSQL          External Services
                              │
                         ┌────┴────┐
                         │         │
                     Payments   Storage
```

The exact hosting providers will be selected later.

---

# 29. CI/CD

A CI pipeline should eventually run:

```text
Push
 ↓
Install Dependencies
 ↓
Lint
 ↓
Type Check
 ↓
Run Tests
 ↓
Build
 ↓
Deploy
```

GitHub Actions will be considered for CI/CD.

---

# 30. Production Environment

Production should include:

* HTTPS
* Secure environment variables
* Production database
* Database backups
* Logging
* Monitoring
* Error tracking
* CORS restrictions
* Rate limiting
* Secure authentication configuration

Development settings must never accidentally be used in production.

---

# 31. Documentation Strategy

Project documentation will be maintained inside:

```text
docs/
```

Current documentation:

```text
PROJECT_PLAN.md
REQUIREMENTS.md
FEATURES.md
ARCHITECTURE.md
DATABASE.md
API.md
UI_UX.md
DEVELOPMENT.md
```

Additional documentation may be added when required:

```text
SECURITY.md
DEPLOYMENT.md
TESTING.md
CONTRIBUTING.md
```

---

# 32. Feature Development Method

Scentora will be built feature-by-feature.

Each feature follows:

```text
Understand Requirement
       ↓
Understand Architecture
       ↓
Design Database
       ↓
Design API
       ↓
Implement Backend
       ↓
Test Backend
       ↓
Implement Frontend
       ↓
Integrate API
       ↓
Test Full Feature
       ↓
Refactor
       ↓
Document
