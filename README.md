
# Role-Based Access Control (RBAC) System

## Description

This project implements a robust **Role-Based Access Control (RBAC)** system using **Node.js, Express.js, and MongoDB Atlas**. It supports multiple levels of access based on user roles, with enhanced security features such as **2-Factor Authentication (2FA) and password policies**.

## Features

- User authentication with JWT tokens
- Role-based access to endpoints
- Secure password storage using bcrypt
- Modular structure for scalability
- Environment variable management with dotenv
- 2-Factor Authentication (2FA)
- Password Policies: Enforces secure password creation,Minimum length of 8 characters,Must include uppercase, lowercase, numbers, and special characters AND Prevents the use of usernames or personal details in passwords.

## Project Structure

```
src/
├── config/          # Configuration files (e.g., database connection)
├── controllers/     # Business logic for handling API requests
├── index.js         # Main entry point of the application
├── middleware/      # Middleware functions (e.g., authentication)
├── models/          # Mongoose schemas and models
├── routes/          # API endpoint definitions
```

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas cluster)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/auth_rbac.git
   ```
2. Navigate to the project directory:
   ```bash
   cd auth_rbac
   ```
3. Install dependencies:
   ```bash
   npm install express mongoose nodemon speakeasy qrcode zxcvbn bcryptjs jsonwebtoken
   ```
4. Create a `.env` file in the root directory and define the following variables:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   PORT=PORT_Number
   ```

## Usage

### Run in Development Mode
Start the application with Nodemon:
```bash
npm run dev
```

## Dependencies

- **bcryptjs**: For hashing passwords.
- **dotenv**: For managing environment variables.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: For JWT-based authentication.
- **mongoose**: MongoDB object modeling.

## API Endpoints
## Authentication:
- POST /register - Register a new user.
- POST /login - Login with username and password (with optional 2FA).
## 2FA:
- POST /enable-2fa - Enable 2FA for an account.
- POST /verify-otp - Verify OTP during login.
## Role Management: 
- GET users/role - Grants available permission for candidate.

## Security Features

- Hashed Passwords: Secure password storage with bcrypt.
- 2FA: Multi-factor authentication for added security.
- Password Strength Enforcement: Enforced policies for strong, secure passwords.
- Rate Limiting: Prevent brute force attacks on login endpoints.
- Time Synchronization: OTP generation accuracy.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for suggestions and bugs.


