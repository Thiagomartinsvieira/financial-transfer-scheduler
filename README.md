# Financial Transfer Scheduling System - Documentation

## System Overview
The **Financial Transfer Scheduling System** is a full-stack application that allows users to schedule financial transfers between accounts, calculate fees based on transfer dates, and view their transfer history. The system consists of a **Spring Boot** backend and a **Vue.js** frontend.

---

## Architecture

### Backend (Spring Boot)
- **Language:** Java 17
- **Framework:** Spring Boot 3.2.3
- **Database:** H2 (in-memory for development)
- **Build Tool:** Maven

### Frontend (Vue.js)
- **Framework:** Vue 3 with Composition API
- **Router:** Vue Router 4
- **State Management:** Pinia
- **HTTP Client:** Axios
- **CSS Framework:** Tailwind CSS
- **Build Tool:** Vite

---

## Key Features

### Transfer Scheduling
- Schedule transfers between accounts
- Real-time fee calculation
- Form validation for account numbers and amounts

### Fee Calculation
- Automatic fee calculation based on transfer date and amount
- Weekend surcharge
- Minimum fee enforcement
- Restrictions on large weekend transfers

### Transfer History
- View all scheduled transfers
- Sort and filter by various criteria
- Status tracking (pending, completed, cancelled)

---

## API Endpoints

### Transfers
- `GET /api/transfers` - Get all transfers
- `GET /api/transfers/{id}` - Get transfer by ID
- `GET /api/transfers/account/{accountNumber}` - Get transfers by account number
- `GET /api/transfers/status/{status}` - Get transfers by status
- `POST /api/transfers` - Schedule a new transfer
- `PUT /api/transfers/{id}/status` - Update transfer status

### Fee Calculator
- `GET /api/transfers/calculate-fee?amount={amount}&date={date}` - Calculate fee for a transfer

---

## Fee Calculation Rules
- **Base fee:** 1% of transfer amount
- **Weekend surcharge:** $5.00
- **Minimum fee:** $2.00
- **Weekend transfers over $1,000** are not supported

---

## Project Structure

### Backend Structure
```
financial-transfer-system/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── financial/
│   │   │           └── transfer/
│   │   │               ├── config/
│   │   │               │   └── DataInitializer.java
│   │   │               ├── controller/
│   │   │               │   └── TransferController.java
│   │   │               ├── dto/
│   │   │               │   ├── TransferRequest.java
│   │   │               │   └── TransferResponse.java
│   │   │               ├── exception/
│   │   │               │   └── GlobalExceptionHandler.java
│   │   │               ├── model/
│   │   │               │   ├── Account.java
│   │   │               │   └── Transfer.java
│   │   │               ├── repository/
│   │   │               │   ├── AccountRepository.java
│   │   │               │   └── TransferRepository.java
│   │   │               ├── service/
│   │   │               │   ├── FeeCalculatorService.java
│   │   │               │   └── TransferService.java
│   │   │               └── TransferApplication.java
│   │   └── resources/
│   │       └── application.properties
└── pom.xml
```

### Frontend Structure
```
financial-transfer-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── FeeCalculator.vue
│   │   ├── TransferConfirmation.vue
│   │   └── TransferTabs.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ScheduleTransferView.vue
│   │   └── TransferHistoryView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Setup Instructions

### Backend Setup
1. Ensure Java 17 and Maven are installed
2. Navigate to the `financial-transfer-system` directory
3. Run:
   ```sh
   mvn spring-boot:run
   ```
4. The backend will start on `http://localhost:8080`

### Frontend Setup
1. Ensure Node.js (v14+) is installed
2. Navigate to the `financial-transfer-frontend` directory
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start development server:
   ```sh
   npm run dev
   ```
5. The frontend will be available at `http://localhost:5173`

### Database Access
The application uses an H2 in-memory database for development:
- **H2 Console:** `http://localhost:8080/h2-console`
- **JDBC URL:** `jdbc:h2:mem:transferdb`
- **Username:** `sa`
- **Password:** (empty)

---

## Component Documentation

### Frontend Components
- **AppHeader:** Main navigation header with links to different sections
- **AppFooter:** Page footer with copyright information
- **TransferTabs:** Tab navigation between schedule and history views
- **FeeCalculator:** Calculates and displays transfer fees based on amount and date
- **TransferConfirmation:** Modal dialog for confirming transfers with different states (pending, success, error)

### Views
- **HomeView:** Landing page with overview and quick access to features
- **ScheduleTransferView:** Form for scheduling new transfers with validation
- **TransferHistoryView:** Table of past and scheduled transfers with filtering and sorting

---

## Development Workflow
The project follows a conventional commit message format:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect code functionality
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

---

## Deployment

### Backend Deployment
```sh
mvn clean package
java -jar target/transfer-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```sh
npm run build
```
Deploy the files in the `dist` directory to a static file server.

---

## Future Enhancements
- User authentication and authorization
- Email notifications for transfer status changes
- Support for recurring transfers
- Mobile application
- Integration with real banking systems
