# 🛒 **FreshBasket – Multi-Vendor Grocery Delivery Platform**

### A Full Stack SaaS-based Multi-Vendor Grocery Application built using **PERN Stack (PostgreSQL, Express, React, Node.js)**.

FreshBasket allows multiple vendors to create and manage their own grocery stores, customers to place orders, and delivery partners to manage deliveries — all controlled by an admin panel.

---

## 🚀 Project Vision

FreshBasket is designed as a scalable multi-vendor grocery delivery platform where:

- 🏪 Multiple store owners can register and manage their stores
- 🛍️ Customers can browse products and place orders
- 🚚 Delivery partners can manage assigned deliveries
- 👨‍💼 Admin controls the entire system
- 📍 Real-time order tracking using shortest path algorithm
- 📈 Smart pricing and trending detection using DSA concepts

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- Prisma ORM

## Database

- PostgreSQL

## Authentication

- Clerk Authentication

---

# 🧠 Data Structures & Algorithms Used

| Feature                 | DSA Concept                    |
| ----------------------- | ------------------------------ |
| Shortest Delivery Route | Dijkstra’s Algorithm           |
| Dynamic Pricing         | Heap (Priority Queue)          |
| Order Processing        | Queue                          |
| Trending Products       | Sliding Window + Frequency Map |
| Cart Optimization       | Hash Map                       |

---
 
## 🏗️ System Architecture

Client (React) → Express API → Prisma ORM → PostgreSQL Database

- REST API Architecture
- Role-Based Access Control
- Modular Backend Structure
- Relational Database Design

## 🗄️ Database Models (Prisma)

- User (Admin / Vendor / Customer / Delivery Partner)
- Store
- Product
- Category
- Cart
- Order
- OrderItem
- DeliveryAssignment

PostgreSQL relational schema with proper indexing and relationships.

---

# 🔐 Roles & Permissions

## 👨‍💼 Admin

- Manage users
- Approve vendors
- Monitor orders
- View analytics

## 🏪 Vendor

- Manage products
- Update inventory
- View store orders

## 👤 Customer

- Browse stores
- Add to cart
- Place orders
- Track delivery

## 🚚 Delivery Partner

- View assigned orders
- Update delivery status

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Navdeepbhatt08/Fresh-Basket-Grocery-App.git
cd Fresh-Basket-Grocery-App

```
