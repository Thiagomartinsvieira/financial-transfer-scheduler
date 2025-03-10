# Financial Transfer Scheduling System

A Spring Boot application that allows users to schedule financial transfers between accounts and view their transfer history, with automatic fee calculation based on the transfer date.

## Features

- **Transfer API**: REST endpoints for scheduling transfers, viewing transfer history, and calculating fees
- **Validation**: Input validation ensuring accounts follow the 10-digit pattern and alerting when no applicable fee exists
- **Transfer History**: API endpoints for retrieving all scheduled transfers with details including accounts, amount, fee, and dates
- **Fee Calculator**: Logic to automatically calculate the fee based on the provided fee schedule

## Technical Stack

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- H2 Database (for development)
- Maven

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven

### Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Maven:

```bash
mvn spring-boot:run
```

The application will start on port 8080.

### API Endpoints

#### Transfers

- `GET /api/transfers` - Get all transfers
- `GET /api/transfers/{id}` - Get transfer by ID
- `GET /api/transfers/account/{accountNumber}` - Get transfers by account number
- `GET /api/transfers/status/{status}` - Get transfers by status
- `POST /api/transfers` - Schedule a new transfer
- `PUT /api/transfers/{id}/status` - Update transfer status

#### Fee Calculator

- `GET /api/transfers/calculate-fee?amount={amount}&date={date}` - Calculate fee for a transfer

## Fee Calculation Rules

- Base fee: 1% of transfer amount
- Weekend surcharge: $5.00
- Minimum fee: $2.00
- Weekend transfers over $1,000 are not supported

## Database

The application uses an H2 in-memory database for development. The H2 console is available at `/h2-console` with the following credentials:

- JDBC URL: `jdbc:h2:mem:transferdb`
- Username: `sa`
- Password: (empty)
