<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Airport Management System

A comprehensive GraphQL-based airport management system built with NestJS, TypeORM, and PostgreSQL. This application manages flights, passengers, baggage tracking, airport operations, staff, and user authentication.

## Description

The Airport Management System is a full-featured backend API for managing airport operations. It provides GraphQL endpoints for managing:

- **Airports**: Airport information and management
- **Flights**: Flight scheduling, routes, and aircraft assignments
- **Passengers**: Passenger information and flight assignments
- **Baggage**: Baggage tracking and status management
- **Staff**: Airport staff management with role-based access
- **Users**: User authentication and authorization with role-based permissions

Built with [NestJS](https://github.com/nestjs/nest), a progressive Node.js framework for building efficient and scalable server-side applications.

## Tech Stack

- **Framework**: NestJS 11
- **API Type**: GraphQL
- **Database**: PostgreSQL with TypeORM
- **Language**: TypeScript
- **Testing**: Jest
- **Validation & Formatting**: ESLint, Prettier

## Project Structure

```
src/
├── airport/          # Airport module (entities, services, resolvers)
├── flights/          # Flights module (scheduling and management)
├── passengers/       # Passengers module (passenger information)
├── baggages/         # Baggage tracking module with enums
├── staff/            # Staff management with role enumeration
├── users/            # User authentication and authorization
├── common/           # Shared utilities and services
├── app.module.ts     # Root application module
├── app.controller.ts # Application controller
├── app.service.ts    # Application service
└── main.ts          # Application entry point
test/                # E2E test configuration
docs/                # Database schema diagram
```

## Features

- GraphQL API for all modules
- Type-safe database operations with TypeORM
- Environment-based configuration
- Role-based access control (Users and Staff)
- Baggage status tracking with enums
- Unit and E2E test coverage
- ESLint and Prettier for code quality

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
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=airport_db
PORT=3000
```

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

The application will be available at `http://localhost:3000/graphql`

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

Manages airport information and serves as a hub for flights, passengers, and staff.

### Flights Module

Handles flight information, scheduling, passenger assignments, and staff assignments.

### Passengers Module

Manages passenger information and their flight assignments.

### Baggages Module

Tracks baggage information with status enumerations (handling different baggage states throughout the airport).

### Staff Module

Manages airport staff with role-based enumeration for different job positions.

### Users Module

Handles user authentication and authorization with role-based access control.

### Common Module

Provides shared utilities and services used across the application.

## License

UNLICENSED
