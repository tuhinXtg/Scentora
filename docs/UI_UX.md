# Scentora — UI/UX Architecture

## 1. UI/UX Goal

Scentora should feel like a real, modern perfume e-commerce brand rather than a student project.

The interface will prioritize:

* Premium visual identity
* Simple navigation
* Fast product discovery
* Clear product information
* Smooth checkout
* Responsive design
* Accessibility
* Consistent components
* Professional micro-interactions

The design should work across:

```text
Desktop
Tablet
Mobile
```

---

# 2. Design Direction

Scentora will use a **premium minimalist perfume aesthetic**.

The design should communicate:

```text
Luxury
Elegance
Trust
Simplicity
Quality
```

The interface should avoid unnecessary visual complexity.

---

# 3. Design System

A centralized design system will be used.

It will define:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Buttons
* Forms
* Cards
* Modals
* Badges
* Icons
* Loading states
* Error states

The design system will be implemented using reusable React components and Tailwind CSS.

---

# 4. Color System

The final brand palette will be selected during the visual design phase.

The system should contain semantic colors rather than hardcoding colors throughout components.

Example:

```text
Primary
Secondary
Background
Surface
Text
Muted
Border
Success
Warning
Error
```

Example usage:

```text
bg-primary
text-primary
bg-surface
text-muted
border-default
```

The actual Tailwind implementation will be defined during frontend development.

---

# 5. Typography

Typography should communicate premium branding while remaining highly readable.

The system should define:

```text
Display
Heading 1
Heading 2
Heading 3
Body Large
Body
Body Small
Caption
Button
```

Typography should remain consistent across all pages.

---

# 6. Responsive Design

Scentora will follow a mobile-first approach.

Target layouts:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
   ↓
Large Desktop
```

Important considerations:

* Navigation must adapt to small screens.
* Product grids must be responsive.
* Checkout must remain easy to use on mobile.
* Buttons must have comfortable touch targets.
* Images must scale correctly.
* Tables in the admin panel must become mobile-friendly.

---

# 7. Customer Application Structure

The customer-facing application will contain:

```text
Home
Shop
Products
Product Details
Categories
Search
Cart
Checkout
Order Confirmation
Orders
Order Details
Wishlist
Profile
Addresses
Login
Register
Forgot Password
Reset Password
```

---

# 8. Global Customer Layout

The main layout will contain:

```text
Announcement Bar
      ↓
Header / Navigation
      ↓
Page Content
      ↓
Footer
```

---

# 9. Header

The header should provide access to:

```text
Logo
Shop
Categories
Search
Wishlist
Cart
Account
```

Desktop:

```text
┌─────────────────────────────────────────────────────┐
│ Logo   Shop   Categories      Search   ♡   Cart  👤 │
└─────────────────────────────────────────────────────┘
```

Mobile navigation will use an appropriate menu structure.

---

# 10. Homepage

The homepage is the primary brand experience.

Sections may include:

```text
Hero
   ↓
Featured Categories
   ↓
Featured Products
   ↓
Brand Story
   ↓
Best Sellers
   ↓
Why Choose Scentora
   ↓
Customer Reviews
   ↓
Newsletter
   ↓
Footer
```

The final sections will depend on actual business requirements.

---

# 11. Hero Section

The hero should immediately communicate:

* Brand identity
* Product category
* Main value proposition
* Primary call-to-action

Example structure:

```text
Premium Fragrance
Discover Your Signature Scent

[Shop Collection]
```

The hero should not contain excessive text.

---

# 12. Shop Page

The shop page is the main product discovery interface.

Layout:

```text
┌──────────────────────────────────────────────┐
│ Shop                        Sort              │
├───────────────┬──────────────────────────────┤
│ Filters       │ Product Grid                 │
│               │                              │
│ Category      │ Product Product Product      │
│ Price         │ Product Product Product      │
│ Availability  │ Product Product Product      │
└───────────────┴──────────────────────────────┘
```

Mobile:

```text
[Filters] [Sort]
```

Filters:

* Category
* Price
* Gender
* Fragrance family
* Availability

---

# 13. Product Card

Every product card should provide:

* Product image
* Product name
* Brand
* Price
* Discounted price if applicable
* Rating
* Wishlist button
* Quick action

Example:

```text
┌────────────────────┐
│                    │
│    Product Image   │
│                    │
│             ♡     │
├────────────────────┤
│ Brand              │
│ Perfume Name       │
│ ★ 4.8              │
│ ৳5,000             │
└────────────────────┘
```

The card should remain visually simple.

---

# 14. Product Details Page

The product page is one of the most important pages.

Layout:

```text
┌───────────────────┬──────────────────────────┐
│                   │ Product Name             │
│                   │ Rating                   │
│ Product Images    │ Price                    │
│                   │ Description              │
│                   │ Size / Variant           │
│                   │ Quantity                 │
│                   │                          │
│                   │ [Add to Cart]            │
│                   │ [Buy Now]                │
└───────────────────┴──────────────────────────┘
```

Additional sections:

```text
Description
Fragrance Details
Ingredients
Reviews
Related Products
```

---

# 15. Product Variant Selection

If a product has multiple sizes:

```text
Choose Size

[30ml] [50ml] [100ml]
```

The selected variant determines:

* Price
* SKU
* Availability
* Inventory

The backend remains the source of truth.

---

# 16. Cart Page

The cart should clearly display:

```text
Product
Variant
Price
Quantity
Subtotal
```

Example:

```text
Product A
50ml
৳3,500
[-] 2 [+]
৳7,000
```

Order summary:

```text
Subtotal
Discount
Delivery
Total

[Proceed to Checkout]
```

---

# 17. Checkout Flow

Checkout should be simple and distraction-free.

Flow:

```text
Cart
 ↓
Shipping Information
 ↓
Delivery Method
 ↓
Payment Method
 ↓
Order Review
 ↓
Place Order
 ↓
Confirmation
```

The checkout should clearly display the final amount before order submission.

---

# 18. Checkout Validation

The frontend should provide immediate feedback.

Examples:

```text
Invalid phone number
Required address
Invalid email
Unavailable product
Invalid coupon
```

However, all important validation must also happen on the backend.

---

# 19. Order Confirmation

After successful order placement:

```text
✓ Order Confirmed

Order #SCN-2026-000001

Thank you for your purchase.

[View Order]
[Continue Shopping]
```

The customer should receive clear confirmation of:

* Order number
* Items
* Total
* Payment status
* Delivery information

---

# 20. Customer Orders

Orders page:

```text
My Orders

┌────────────────────────────────────────────┐
│ #SCN-0001   Confirmed   ৳5,000   View →   │
│ #SCN-0002   Delivered   ৳3,500   View →   │
│ #SCN-0003   Shipped     ৳7,000   View →   │
└────────────────────────────────────────────┘
```

---

# 21. Order Details

The order details page should show:

```text
Order Number
Order Status
Payment Status

Products
Quantities
Prices

Shipping Address
Delivery Information

Subtotal
Discount
Delivery Fee
Total
```

A visual order status timeline may be used:

```text
Confirmed
   ●
   │
Processing
   ●
   │
Shipped
   ●
   │
Delivered
   ○
```

---

# 22. Authentication Pages

Required pages:

```text
Login
Register
Forgot Password
Reset Password
```

The design should be simple and focused.

Example:

```text
Welcome Back

Email
[________________]

Password
[________________]

[Login]

Forgot Password?

Don't have an account?
[Create Account]
```

---

# 23. Customer Account

Account dashboard:

```text
My Account
│
├── Profile
├── Orders
├── Addresses
├── Wishlist
├── Security
└── Logout
```

---

# 24. Search Experience

Search should be easily accessible from the header.

Search flow:

```text
User enters query
       ↓
Search API
       ↓
Results
       ↓
Filters
       ↓
Product
```

Future versions may provide:

* Search suggestions
* Recent searches
* Popular searches
* Advanced search

---

# 25. Wishlist

Wishlist page:

```text
My Wishlist

Product Product Product
   ♡       ♡       ♡

[Add to Cart]
```

Users should be able to move wishlist items directly to the cart.

---

# 26. Footer

Footer sections may include:

```text
Scentora
About
Shop
Customer Service
Contact
Shipping Policy
Return Policy
Privacy Policy
Terms
Social Links
Newsletter
```

The footer should remain consistent across customer pages.

---

# 27. Admin Application

The admin application will use a separate dashboard layout.

```text
┌──────────────┬────────────────────────────────────┐
│              │                                    │
│   Sidebar    │           Main Content              │
│              │                                    │
│ Dashboard    │                                    │
│ Products     │                                    │
│ Orders       │                                    │
│ Inventory    │                                    │
│ Customers    │                                    │
│ Reviews      │                                    │
│ Coupons      │                                    │
│ Settings     │                                    │
│              │                                    │
└──────────────┴────────────────────────────────────┘
```

---

# 28. Admin Dashboard

Dashboard cards:

```text
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Revenue    │ │ Orders     │ │ Customers  │
│ ৳250,000   │ │ 128        │ │ 850        │
└────────────┘ └────────────┘ └────────────┘
```

Additional sections:

```text
Sales Chart
Recent Orders
Best Sellers
Low Stock Products
Recent Customers
```

---

# 29. Admin Product Management

Product management should provide:

```text
Products
[+ Add Product]

Search
Filter
Sort

Product
SKU
Price
Stock
Status
Actions
```

Actions:

```text
View
Edit
Archive
Delete
```

---

# 30. Product Creation

Product form:

```text
Basic Information
├── Name
├── Brand
├── Description
├── Category
└── Fragrance Information

Images
├── Upload
└── Manage

Variants
├── Size
├── SKU
├── Price
└── Stock

Visibility
└── Active / Inactive
```

The form should provide clear validation and error messages.

---

# 31. Admin Order Management

Order management table:

```text
Order
Customer
Amount
Payment
Status
Date
Actions
```

Admin can:

* View order
* Update order status
* Review payment
* View customer information
* Review order items

---

# 32. Admin Inventory

Inventory dashboard:

```text
Product
Variant
Current Stock
Reserved
Available
Status
```

Low-stock products should be clearly identifiable.

---

# 33. Admin Customers

Customer management:

```text
Customer
Email
Orders
Total Spent
Status
Joined
Actions
```

Admin can view:

* Customer profile
* Order history
* Account status

---

# 34. Admin Reviews

Review moderation:

```text
Product
Customer
Rating
Review
Status
Date
Actions
```

Actions:

```text
Approve
Reject
Delete
```

---

# 35. Admin Coupons

Coupon management:

```text
Code
Discount
Usage
Start
Expiry
Status
Actions
```

Admin can create and manage promotional campaigns.

---

# 36. Loading States

Every asynchronous interface should have a loading state.

Examples:

```text
Product Skeleton
Table Skeleton
Button Spinner
Page Loader
```

Avoid blank screens while data is loading.

---

# 37. Empty States

Every list should have a meaningful empty state.

Example:

```text
Your wishlist is empty.

Discover something you'll love.

[Explore Products]
```

Other examples:

```text
No orders yet.
No products found.
No reviews yet.
No customers found.
```

---

# 38. Error States

Errors should be understandable.

Example:

```text
Something went wrong.

We couldn't load your products.

[Try Again]
```

Technical errors should not be exposed directly to customers.

---

# 39. Toast Notifications

Short-lived feedback can use toast notifications.

Examples:

```text
✓ Added to cart
✓ Wishlist updated
✓ Address saved
✓ Order cancelled
✕ Payment failed
```

Toasts should not replace important error messages or confirmations.

---

# 40. Confirmation Dialogs

Destructive actions should require confirmation.

Example:

```text
Delete Product?

This action cannot be undone.

[Cancel] [Delete]
```

Used for:

* Product deletion
* Address deletion
* Review deletion
* Account deletion

---

# 41. Accessibility

The UI should follow accessibility best practices.

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper labels
* Accessible buttons
* Alt text for images
* Sufficient contrast
* Meaningful error messages
* Screen-reader-friendly structure

Accessibility should be considered during component development rather than added afterward.

---

# 42. Performance

The frontend should prioritize:

* Optimized images
* Lazy loading
* Code splitting
* Efficient API requests
* Minimal unnecessary re-renders
* Proper caching where appropriate
* Responsive images

Performance will be measured rather than optimized blindly.

---

# 43. Component Architecture

Reusable UI components will be created.

Example:

```text
components/
├── ui/
│   ├── Button
│   ├── Input
│   ├── Modal
│   ├── Badge
│   ├── Spinner
│   └── Toast
│
├── product/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductGallery
│   └── VariantSelector
│
├── cart/
│   ├── CartItem
│   └── CartSummary
│
└── layout/
    ├── Header
    ├── Footer
    └── Sidebar
```

Components should be reusable rather than duplicated across pages.

---

# 44. State Management

Frontend state will be divided into:

### Local UI State

Examples:

```text
Modal open/close
Selected tab
Form input
Dropdown state
```

### Server State

Examples:

```text
Products
Orders
User profile
Cart data
Reviews
```

A dedicated server-state/data-fetching strategy will be selected during implementation.

### Global Client State

Only state that genuinely needs global access should be placed globally.

Avoid creating unnecessary global state.

---

# 45. Routing Architecture

Customer routes:

```text
/
 /shop
 /products/:id
 /categories/:slug
 /search
 /cart
 /checkout
 /order-confirmation/:id
 /orders
 /orders/:id
 /wishlist
 /account
 /account/profile
 /account/addresses
 /account/security
```

Authentication routes:

```text
/login
/register
/forgot-password
/reset-password
```

Admin routes:

```text
/admin
/admin/products
/admin/products/new
/admin/products/:id
/admin/orders
/admin/orders/:id
/admin/inventory
/admin/customers
/admin/customers/:id
/admin/reviews
/admin/coupons
/admin/settings
```

Protected routes will require appropriate authentication and authorization.

---

# 46. User Flow — New Customer

```text
Homepage
   ↓
Shop
   ↓
Product
   ↓
Select Variant
   ↓
Add to Cart
   ↓
Cart
   ↓
Login / Register
   ↓
Checkout
   ↓
Shipping
   ↓
Payment
   ↓
Order Confirmation
   ↓
Order Tracking
```

---

# 47. User Flow — Returning Customer

```text
Homepage
   ↓
Login
   ↓
Product
   ↓
Add to Cart
   ↓
Checkout
   ↓
Saved Address
   ↓
Payment
   ↓
Order Confirmation
```

The returning-customer experience should minimize friction.

---

# 48. Admin Flow

```text
Admin Login
    ↓
Dashboard
    ↓
Choose Module
    │
    ├── Products
    ├── Orders
    ├── Inventory
    ├── Customers
    ├── Reviews
    └── Coupons
```

---

# 49. Mobile UX

Mobile users should receive a first-class experience.

Important areas:

* Bottom-friendly navigation
* Large touch targets
* Simplified filters
* Sticky cart/checkout actions where appropriate
* Responsive product galleries
* Mobile-friendly forms
* Horizontal scrolling where appropriate
* No unnecessary desktop-only interactions

---

# 50. UI/UX Quality Standards

Every page should be evaluated for:

```text
Visual hierarchy
Consistency
Responsiveness
Accessibility
Performance
Loading states
Empty states
Error states
User feedback
```

A page is not considered complete simply because it visually renders.

---

# 51. UI/UX Status

| Area                   | Status  |
| ---------------------- | ------- |
| Design direction       | Defined |
| Design system          | Defined |
| Responsive strategy    | Defined |
| Customer pages         | Defined |
| Admin pages            | Defined |
| Navigation             | Defined |
| Checkout flow          | Defined |
| Authentication flow    | Defined |
| Component architecture | Defined |
| Accessibility          | Defined |
| Performance strategy   | Defined |
| Mobile UX              | Defined |
