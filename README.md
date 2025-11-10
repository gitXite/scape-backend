# SCAPE by md - Backend API
**Backend API repository** for **SCAPE by md**, a hybrid full-stack e-commerce service that prints, frames, and delivers beautiful, sentimental decoration pieces.

<p align="center"> 
  <img src="https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?logo=typescript" alt="TypeScript"> 
  <img src="https://img.shields.io/badge/Node.js-%E2%9C%94-brightgreen?logo=node.js" alt="Node.js"> 
  <img src="https://img.shields.io/badge/Framework-Express-lightgrey?logo=express" alt="Express">
  <img src="https://img.shields.io/github/last-commit/gitXite/scape-backend" alt="Last Commit">
  <img src="https://img.shields.io/github/languages/top/gitXite/scape-backend" alt="Top Language">
</p>

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Development](#development)  
  - [Production](#production)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Linting & Testing](#linting--testing)
- [Deployment](#depoloyment)
- [Contact](#contact)

---

## Overview
The SCAPE Backend API powers the e-commerce operations for SCAPE by md — including model generation, product management, order processing, and integration with payment and fulfillment services.
It’s built with Node.js, Express, and TypeScript for scalability, maintainability, and performance.

---

## Features
- RESTful API built with Express and TypeScript
- Modular architecture for easy maintenance and feature growth
- Payment integration with Vipps
- Secure API endpoints with input validation and error handling
- Dockerized deployment

---

## Tech Stack
- Language: TypeScript
- Runtime: Node.js
- Framework: Express
- Validation: Zod
- Linting / Formatting: ESLint / Prettier
- Testing: Jest

---

## Getting Started
### Prerequisites
Node.js (v18+)
npm or Yarn

### Installation 
``` bash
git clone https://github.com/gitXite/scape-backend.git
cd scape-backend
npm install
# or yarn install
```

### Development
``` bash
# Start development server
npm run dev
# or
yarn dev
```
By default, the server runs at:
👉 http://localhost:5000 (or as configured in .env)

### Production
``` bash
npm run build
npm run start
```

---

## Project Structure
``` plaintext
/
├── src/
│   ├── config/           # Environment, logging, and DB config
│   ├── controllers/      # Route handlers
│   ├── middlewares/      # Custom Express middleware
│   ├── routes/           # API route definitions
│   ├── templates/        # HTML templates for emails
│   ├── services/         # Business logic
|   ├── types/            # Reusable types
│   ├── utils/            # Utility functions and helpers
│   └── index.ts          # Express app setup & server entry point
│
├── tests/                # Jest files
├── .env.example          # Example environment variables
├── .gitignore
├── eslint.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Environment Variables
Create a .env file at the project root:
``` bash
PORT=5000
NODE_ENV=development
TERRAIN_API_KEY=secretKey
```

---

## Linting & Testing
### Linting
``` bash
npm run lint
# or
yarn lint
```

### Testing
``` bash
npm run test
# or
yarn test
```
Uses Jest for unit testing

---

## Deployment
You can deploy the backend API to any Node.js hosting provider:
Render / Railway / Vercel / Fly.io
Docker (via Dockerfile)
AWS / GCP / Azure (for production workloads)

--- 

## Contact
Developed by gitXite.
For inquiries or collaboration: reach out via GitHub or email!
