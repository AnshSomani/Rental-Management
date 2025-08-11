# Rental Management App

Stack: React (Vite) + Tailwind CSS, Express, MongoDB, Razorpay (payments)

## Setup

1. Server environment

Create `/workspace/rental-app/server/.env` with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rental_app
JWT_SECRET=supersecret
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=rzp_test_secret
DEPOSIT_PERCENT=30
```

2. Client environment

Create `/workspace/rental-app/client/.env` with:

```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

## Install

```
cd /workspace/rental-app/server && npm install
cd /workspace/rental-app/client && npm install
```

## Run

In two terminals:

```
cd /workspace/rental-app/server && npm start
cd /workspace/rental-app/client && npm run dev
```

The client runs at http://localhost:5173 and proxies API requests to http://localhost:5000.

## Features

- Rental product management with pricing per hour/day/week/month/year
- Availability check with date-range overlap prevention
- Rental orders: reservation → pickup → return → completed
- Flexible invoicing: full or deposit (partial) payments; late fee auto-calc
- Razorpay integration (create order, verify, partial payments)
- Pricelists framework (rules, validity windows)
- Notifications: upcoming return reminders (stubbed API)
- Admin dashboard stats: revenue, most rented products, top customers, categories

## Notes

- Replace Razorpay test keys with your own.
- Ensure MongoDB is running locally or update `MONGODB_URI`.