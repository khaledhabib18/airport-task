<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Airport Management System

A comprehensive GraphQL-based airport management system built with NestJS, TypeORM, and PostgreSQL. This application manages flights, passengers, baggage tracking, airport operations, staff, user authentication, and multi-channel communications (Email & WhatsApp).

## Description

The Airport Management System is a full-featured backend API for managing airport operations. It provides GraphQL endpoints for managing:

- **Airports**: Airport information and management
- **Flights**: Flight scheduling, routes, and aircraft assignments
- **Passengers**: Passenger information and flight assignments with registration
- **Baggage**: Baggage tracking and status management with barcode support
- **Staff**: Airport staff management with role-based access control
- **Users**: User authentication and authorization with role-based permissions and OTP verification
- **Authentication**: User signup/signin with JWT tokens and email OTP verification
- **Notifications**: Email notifications (MJML templates) and WhatsApp messaging integration
- **Data Loaders**: Efficient batch loading to prevent N+1 query problems

Built with [NestJS](https://github.com/nestjs/nest), a progressive Node.js framework for building efficient and scalable server-side applications.

## Tech Stack

- **Framework**: NestJS 11
- **API Type**: GraphQL (Apollo Driver)
- **Database**: PostgreSQL with TypeORM
- **Language**: TypeScript
- **Authentication**: JWT with OTP verification
- **Email Service**: Nodemailer with MJML templates
- **WhatsApp Integration**: WhatsApp Web.js with Puppeteer
- **Barcode Generation**: BWIP-js (Barcode/QR code generation)
- **Image Processing**: Sharp
- **Testing**: Jest with E2E support
- **Code Quality**: ESLint, Prettier
- **Data Loading**: DataLoader for batch operations

## Project Structure

```
src/
├── airport/          # Airport module (entities, services, resolvers)
├── auth/             # Authentication module (signup, signin, OTP verification)
│   ├── decorators/   # Custom decorators (HasRole)
│   └── inputs/       # GraphQL input types
├── flights/          # Flights module (scheduling and management)
│   ├── dtos/         # Data transfer objects
│   ├── inputs/       # GraphQL input types
│   └── outputs/      # GraphQL output types
├── passengers/       # Passengers module (passenger information and registration)
│   └── inputs/       # GraphQL input types
├── baggages/         # Baggage tracking module with status enums
│   └── inputs/       # GraphQL input types
├── staff/            # Staff management with role enumeration
│   └── inputs/       # GraphQL input types
├── users/            # User authentication and authorization
│   ├── entities/     # User entity and related types
│   ├── services/     # User and OTP services
│   ├── dtos/         # Data transfer objects
│   └── decorators/   # Custom decorators
├── mail/             # Email service with MJML templates
├── whatsapp/         # WhatsApp messaging service
├── common/           # Shared utilities, services, and exception filters
├── dataloader/       # DataLoader service for batch operations
├── app.module.ts     # Root application module
├── app.controller.ts # Application controller
├── app.service.ts    # Application service
└── main.ts          # Application entry point
test/                # E2E test configuration
docs/                # Database schema diagram (db.drawio)
```

## Features

- **GraphQL API** for all modules with subscriptions support
- **Type-safe database operations** with TypeORM and PostgreSQL
- **Authentication & Authorization**:
  - User signup and signin with JWT tokens
  - OTP-based email verification
  - Role-based access control (RBAC)
  - Custom decorators for role validation
- **Email Notifications**:
  - MJML templates for professional emails
  - OTP delivery and flight/baggage notifications
  - Gmail integration via Nodemailer
- **WhatsApp Integration**:
  - Real-time WhatsApp messaging
  - Headless Puppeteer browser automation
  - Local authentication strategy
- **Baggage Management**:
  - Comprehensive baggage tracking with status enums
  - QR code and barcode generation support
- **Performance Optimization**:
  - DataLoader for batch operations and preventing N+1 queries
- **Environment-based configuration** with ConfigModule
- **Comprehensive error handling** with custom exception filters
- **Unit and E2E test coverage** with Jest
- **Code quality enforcement** with ESLint and Prettier
- **Static file serving** for frontend assets

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Installation

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=airport_db

# Application Server
PORT=3000

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# JWT Secret (for token signing)
JWT_SECRET=your_secret_key

# WhatsApp Configuration (if using WhatsApp integration)
WHATSAPP_ENABLED=false
```

**Note**: For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

## Running the Application

### Development Mode

```bash
# Start in development mode with hot-reload
npm run start:dev
```

### Debug Mode

```bash
# Start in debug mode with breakpoint support
npm run start:debug
```

### Production Mode

```bash
# Build the application
npm run build

# Start the production build
npm run start:prod
```

The GraphQL API will be available at `http://localhost:3000/graphql`
The playground and GraphQL IDE will be available at the same URL for interactive queries.

## GraphQL Playground

Once the application is running, navigate to `http://localhost:3000/graphql` to access the Apollo GraphQL Sandbox where you can:

- Write and test GraphQL queries
- Explore the schema documentation
- Subscribe to real-time updates
- View query results

### Example GraphQL Query

```graphql
query GetAirports {
  airports {
    id
    name
    city
    country
  }
}
```

## Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:cov

# Run E2E tests
npm run test:e2e
```

## Code Quality

```bash
# Format code with Prettier
npm run format

# Run ESLint and fix issues
npm run lint
```

## Database Schema

For detailed database schema information, see [db.drawio](docs/db.drawio)

## Project Modules

### Airport Module

Manages airport information and serves as a hub for flights, passengers, and staff. Stores airport locations and operational details.

### Auth Module

Handles user authentication with:

- User signup and signin
- OTP-based email verification
- JWT token generation and validation
- Custom decorators for role-based access control

### Flights Module

Manages:

- Flight information and scheduling
- Flight routes and aircraft assignments
- Passenger assignments to flights
- Staff assignments and crew management
- Flight status tracking

### Passengers Module

Manages:

- Passenger information and profiles
- Passenger registration process
- Flight assignments
- Links to user accounts and baggage

### Baggages Module

Comprehensive baggage management featuring:

- Baggage tracking with barcode/QR codes
- Baggage status enumerations (checked-in, boarded, delivered, etc.)
- Baggage-to-passenger associations
- Real-time baggage tracking

### Staff Module

Manages:

- Airport staff information
- Staff role enumeration (pilot, ground staff, security, etc.)
- Staff assignments to flights
- Role-based access control for staff actions

### Users Module

Handles:

- User account management
- User role enumeration (admin, passenger, staff, etc.)
- OTP management and verification
- Password management and security
- User profile information

### Mail Module

Provides email services with:

- MJML template-based emails
- OTP delivery
- Flight notifications
- Baggage status updates
- Gmail SMTP integration

### WhatsApp Module

Offers WhatsApp messaging integration:

- WhatsApp Web.js client
- Headless Puppeteer browser automation
- Real-time message delivery
- Local authentication strategy

### Common Module

Provides:

- Shared utilities and helper functions
- Common database entity base classes
- GraphQL exception filters
- Reusable services

### DataLoader Module

Optimizes GraphQL query performance:

- Batch loading of related entities
- Prevention of N+1 query problems
- Efficient data resolution

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Ensure all tests pass before submitting a PR
3. Run `npm run lint` to fix code style issues
4. Run `npm run format` to format code with Prettier
5. Add tests for new features or bug fixes

## Support & Documentation

For more information about the technologies used:

- [NestJS Documentation](https://docs.nestjs.com/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [TypeORM Documentation](https://typeorm.io/)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Nodemailer](https://nodemailer.com/)
- [WhatsApp Web.js](https://wwebjs.dev/)

## License

UNLICENSED
