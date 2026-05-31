# Admin Panel Setup Guide

## Overview
The MAHIDE admin panel allows you to:
- ✅ Add new products from your phone or desktop
- ✅ Edit existing products
- ✅ Delete products
- ✅ Manage product status (In Stock, Out of Stock, Coming Soon)
- ✅ Toggle featured items
- ✅ Manage all product details

## Getting Started

### 1. Set Up MongoDB

1. Create a free MongoDB account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/mahide`)

### 2. Configure Environment Variables

Update `.env.local` in the root directory:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/mahide?retryWrites=true&w=majority
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SECRET_KEY=your_secret_key_here_change_this
```

**Important:** 
- Change `ADMIN_PASSWORD` to a strong password
- Change `ADMIN_SECRET_KEY` to something unique
- Never commit `.env.local` to git

### 3. Access the Admin Panel

**URL:** `http://localhost:3000/admin`
- You'll be redirected to the login page
- Enter your admin password
- You'll stay logged in for 7 days

### 4. Managing Products

#### Add a New Product
1. Click "+ Add New Product"
2. Fill in all fields
3. Enter image URLs (use `/filename.jpg` for files in `/public` folder)
4. Click "Save Product"

#### Edit a Product
1. Click "Edit" on any product
2. Modify the fields
3. Click "Save Product"

#### Delete a Product
1. Click "Delete" on any product
2. Confirm the deletion

#### Product Fields Explained

- **Product ID**: Unique identifier (used in URLs like `/shop/{id}`)
- **Product Name**: Display name on the website
- **Price**: Price with currency (e.g., "₦25,000")
- **Main Image**: URL to the primary product image
- **Image URLs**: Additional product images (comma-separated)
- **Description**: Full product description
- **Material**: Fabric/material composition
- **Sizes**: Available sizes (comma-separated, e.g., "S, M, L, XL")
- **Colors**: Available colors (comma-separated)
- **Care Instructions**: Washing/care instructions
- **Availability**: 
  - In Stock (purchasable)
  - Out of Stock (disabled)
  - Coming Soon (shows as unavailable)
- **Featured**: Check to show in the "Featured Pieces" section (max 3 recommended)

## API Endpoints (for advanced use)

### Login
```
POST /api/admin/login
Body: { "password": "admin_password" }
```

### Get All Products
```
GET /api/admin/products
```

### Create Product
```
POST /api/admin/products
Body: { product object }
```

### Update Product
```
PUT /api/admin/products
Body: { id: "mongodb_id", ...fields_to_update }
```

### Delete Product
```
DELETE /api/admin/products?id=mongodb_id
```

### Logout
```
POST /api/admin/logout
```

## Troubleshooting

### "Connection refused" error
- Check your MongoDB URI in `.env.local`
- Ensure MongoDB IP whitelist includes your IP
- Verify database is created

### "Invalid password" on login
- Check `ADMIN_PASSWORD` in `.env.local`
- Restart the dev server after changing `.env.local`

### Products not saving
- Check browser console for error messages
- Verify MongoDB connection is working
- Check that all required fields are filled

## Migrating Existing Products

To add your current hardcoded products to MongoDB:

1. Access `/admin/login`
2. Enter the admin password
3. Go to `/admin/dashboard`
4. Manually add each product or contact for bulk import

## Mobile Access

The admin panel is fully mobile-responsive! You can manage products from your phone:
- Visit `https://yourdomain.com/admin` on mobile
- Login and manage products on the go

## Security Notes

- Keep `ADMIN_PASSWORD` secure
- Change it regularly
- Don't share it in code or git
- The admin session uses secure cookies (7-day expiry)
- Always use HTTPS in production
