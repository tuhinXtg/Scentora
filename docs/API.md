# API Design

## Versioning

Use a structured versioning format such as:

```text
/api/v1
```

## Main API Areas

- `/auth`
- `/users`
- `/products`
- `/categories`
- `/cart`
- `/wishlist`
- `/addresses`
- `/orders`
- `/payments`
- `/reviews`
- `/coupons`
- `/admin`

## Endpoint Documentation Fields

Each endpoint should define:

- HTTP method
- URL
- Authentication requirement
- Authorization requirement
- Request format
- Response format
- Validation rules
- Possible errors

## Example

```text
GET    /api/v1/products
GET    /api/v1/products/{id}
POST   /api/v1/products
PATCH  /api/v1/products/{id}
DELETE /api/v1/products/{id}
```

