# StoreForge 🌐

StoreForge is an advanced, multi-tenant B2B SaaS platform that allows users to instantly launch, manage, and scale their own customized e-commerce stores. Designed with a sleek, premium UI and powered by real-time analytics, StoreForge gives store owners comprehensive tools to succeed while providing super admins full oversight of the entire ecosystem.

**🚀 Live Platform Link**: [Insert Live App Link Here]  
**🏪 Live Example Store Link**: [Insert Example Store Link Here]

---

## ✨ Features

### 👑 Super Admin Portal
* **Platform Health & Metrics**: Monitor all tenants, revenue generated across the system, and active subscriptions.
* **Subscription Management**: Full CRUD capabilities to dynamically update SaaS plans, limit capabilities, and deactivate offerings.
* **Tenant Monitoring**: Keep an eye on platform users, storage limits, and store health.

### 💼 Store Admin Portal (Tenant Dashboard)
* **Real-Time Analytics & KPIs**: Live charts (built with Recharts) tracking day-over-day (DoD) growth, revenue, and order trends.
* **Instant Notifications**: Real-time Socket.io integration instantly alerts store owners the moment a customer places an order.
* **Product Catalog**: Beautiful, drag-and-drop-style UI for adding and tracking product inventory with integrated Cloudinary media hosting.
* **Orders Management**: Comprehensive order tracking with live status updates.

### 🛒 Customer Storefront (Public)
* **Custom Store URLs**: Dynamic routing based on tenant slugs (e.g., `/store/my-brand`).
* **Interactive Shopping Cart**: Beautiful cart and checkout experience.
* **Isolated Data**: Complete tenant data isolation so customers only interact with products specific to the store they are visiting.

---

## 🛠️ Technology Stack

**Frontend**
* React.js (Vite)
* TailwindCSS (Premium UI/UX, Custom Gradients, Animations)
* Recharts (Data Visualization)
* Socket.io-client (Real-time updates)
* React Router DOM (Dynamic routing & protected routes)

**Backend**
* Node.js & Express.js
* MongoDB & Mongoose (Multi-tenant schema architecture)
* Socket.io (Real-time events pushing)
* JWT (JSON Web Tokens) for Role-Based Access Control (Super Admin vs. Store Admin)
* Cloudinary (Cloud media storage for product assets)

---

## ⚙️ Environment Variables

To run this project locally, you will need to set up Environment Secret files (`.env`) for both the backend and frontend.

### Backend (`backend/.env`)

```env
# Server Config
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string_here

# Security
JWT_SECRET=your_secret_key_here

# Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/.env`)

```env
# API Configuration (Points to live or local backend)
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Running Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StoreForge
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create the .env file as instructed above
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   # Create the .env file as instructed above
   npm run dev
   ```

4. **Access the application**
   * Frontend natively runs on `http://localhost:5173`
   * Backend natively runs on `http://localhost:5000`

---

## 🔑 Demo Access (Local Testing)
If configured with the default seeds/database, you can access the platform via the following test accounts:
* **Super Admin**: `superadmin@storeforge.com` / `admin123`
* **Store Owner (Tenant)**: `ABC@gmail.com` / `123456`

---
*Built to empower the next generation of online businesses.*
