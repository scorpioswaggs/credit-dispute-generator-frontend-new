# CrediSure - Credit Dispute Letter Generator

CrediSure is a SaaS application that generates credit dispute letters based on user input. The tool supports multiple dispute types and offers two distinct dispute letter formats.

## Features

- **User-friendly Interface**: Simple, intuitive interface with dropdown menus and text input fields
- **Multiple Dispute Categories**:
  - Late Payment Disputes (Goodwill, Compliance-Based, Reporting Error)
  - Collection Disputes (Debt Validation, Cease & Desist, Unverifiable Debt)
  - Personal Information Disputes (Incorrect Name, SSN, Address)
  - Account Disputes (Fraudulent Accounts, Charge-Offs, Repossessions)
- **Two Dispute Letter Formats**:
  - Metro 2 Compliant Dispute: Uses Metro 2 data compliance codes, reporting standards, and FCRA laws
  - FCRA, FTC & FDCPA-Based Dispute: Challenges violations under consumer protection laws
- **AI Letter Generation**: Creates fully formatted dispute letters with professional headers, legally backed arguments, and resolution requests
- **Premium Features**:
  - Metro 2 & Legal Argument Enhancements
  - Bulk Dispute Letter Generation
  - Step-by-Step Dispute Strategy Guide
- **Affiliate Integrations**: Links to credit monitoring services

## Technology Stack

- **Frontend**: React, Material UI, Formik, PDF generation libraries
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based authentication
- **Deployment**: Ready for deployment to any hosting platform

## Project Structure

```
credit-dispute-generator/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (auth, etc.)
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── templates/       # Letter templates
│   └── test/                # Backend tests
└── docs/                    # Documentation files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
```
git clone https://github.com/scorpioswaggs/credit-dispute-generator-frontend-new.git
cd credit-dispute-generator-frontend-new
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Install frontend dependencies:
```
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/credisure
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Application

1. Start the backend server:
```
cd backend
npm run dev
```

2. Start the frontend development server:
```
cd frontend
npm start
```

3. Access the application at `http://localhost:3000`

## Testing

Run backend tests:
```
cd backend
npm test
```

## Deployment

The application is ready for deployment to any hosting platform that supports Node.js applications.

## License

This project is licensed under the ISC License.
