# Financial Transfer System - Vue.js Frontend

This is the Vue.js frontend for the Financial Transfer Scheduling System. It works with the Spring Boot backend to provide a complete financial transfer management solution.

## Features

- Schedule new financial transfers between accounts
- View transfer history with sorting and filtering
- Real-time fee calculation based on transfer date and amount
- Responsive design that works on desktop and mobile devices

## Tech Stack

- Vue 3 with Composition API
- Vue Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## API Integration

The frontend communicates with the Spring Boot backend API. The API endpoints are proxied through Vite's development server to avoid CORS issues during development.

Main API endpoints used:

- `GET /api/transfers` - Get all transfers
- `GET /api/transfers/{id}` - Get transfer by ID
- `POST /api/transfers` - Schedule a new transfer
- `GET /api/transfers/calculate-fee` - Calculate fee for a transfer

## Components

- **AppHeader** - Main navigation header
- **AppFooter** - Page footer with copyright information
- **TransferTabs** - Tab navigation between schedule and history views
- **FeeCalculator** - Calculates and displays transfer fees
- **TransferConfirmation** - Modal dialog for confirming transfers

## Views

- **HomeView** - Landing page with overview and quick access to features
- **ScheduleTransferView** - Form for scheduling new transfers
- **TransferHistoryView** - Table of past and scheduled transfers with filtering and sorting
