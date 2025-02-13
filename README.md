# User Management API

A robust TypeScript-based REST API for user management with authentication, built using Express.js and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication with HTTP-only cookies
- Input validation using Joi
- MongoDB integration with Mongoose
- TypeScript support
- Password hashing with bcrypt
- User search functionality
- Environment variable configuration
- Error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your-secret-key
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

## API Endpoints

### User Registration
- **POST** `/api/users/register`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "fullName": "John Doe",
  "gender": "male",
  "dateOfBirth": "1990-01-01",
  "country": "USA"
}
```

### User Login
- **POST** `/api/users/login`
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

### Search Users
- **GET** `/api/users/search?q=searchterm`
- Requires authentication (JWT token in cookie)

## Authentication

The API uses JWT tokens stored in HTTP-only cookies for authentication. Upon successful login, a token is automatically set in the response cookies. This token is required for accessing protected routes.

## Project Structure

```
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── repositories/
│   │   └── user.repository.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── services/
│   │   └── user.service.ts
│   ├── types/
│   │   └── user.ts
│   ├── utils/
│   │   └── password.ts
│   └── index.ts
```

## Security Features

- Password hashing using bcrypt
- HTTP-only cookies for JWT storage
- Input validation for all requests
- Secure password handling
- Environment variable configuration
- CORS support

## Error Handling

The API includes a global error handler middleware that catches and processes all errors. Specific error messages are returned for:
- Validation errors
- Authentication failures
- Duplicate username/email
- Invalid credentials
- Server errors

## Development

To run the project in development mode:

```bash
npm run dev
```

This will start the server with nodemon for automatic reloading on file changes.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/user_management |
| JWT_SECRET | Secret key for JWT signing | your-secret-key |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
