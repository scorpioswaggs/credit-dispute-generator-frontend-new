# CrediSure API Endpoints

## Authentication Endpoints

### POST /api/auth/register
- Description: Register a new user
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345"
    },
    "phone": "555-123-4567"
  }
  ```
- Response: User object with JWT token

### POST /api/auth/login
- Description: Authenticate a user
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- Response: User object with JWT token

### GET /api/auth/me
- Description: Get current user profile
- Authentication: Required
- Response: User object

### PUT /api/auth/profile
- Description: Update user profile
- Authentication: Required
- Request Body: User profile fields to update
- Response: Updated user object

## Dispute Letter Endpoints

### GET /api/letters
- Description: Get all dispute letters for the current user
- Authentication: Required
- Query Parameters:
  - status: Filter by letter status
  - category: Filter by dispute category
- Response: Array of dispute letter objects

### GET /api/letters/:id
- Description: Get a specific dispute letter
- Authentication: Required
- Response: Dispute letter object

### POST /api/letters
- Description: Create a new dispute letter
- Authentication: Required
- Request Body:
  ```json
  {
    "personalInfo": {
      "fullName": "John Doe",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345"
      },
      "phone": "555-123-4567",
      "email": "user@example.com"
    },
    "creditorInfo": {
      "name": "ABC Bank",
      "address": {
        "street": "456 Finance Ave",
        "city": "Moneytown",
        "state": "NY",
        "zipCode": "67890"
      },
      "accountNumber": "1234567890"
    },
    "disputeDetails": {
      "category": "latePayment",
      "subCategory": "goodwill",
      "reason": "Payment was only 3 days late due to postal delay",
      "additionalDetails": "I have been a customer in good standing for 5 years"
    },
    "letterFormat": "metro2"
  }
  ```
- Response: Created dispute letter object

### PUT /api/letters/:id
- Description: Update a dispute letter
- Authentication: Required
- Request Body: Dispute letter fields to update
- Response: Updated dispute letter object

### DELETE /api/letters/:id
- Description: Delete a dispute letter
- Authentication: Required
- Response: Success message

### POST /api/letters/:id/generate
- Description: Generate the letter content based on template
- Authentication: Required
- Response: Updated dispute letter with generated content

### GET /api/letters/:id/download
- Description: Download the dispute letter as PDF
- Authentication: Required
- Response: PDF file

## Template Endpoints

### GET /api/templates
- Description: Get all dispute letter templates
- Authentication: Required
- Query Parameters:
  - category: Filter by dispute category
  - format: Filter by letter format
  - premium: Filter by premium status
- Response: Array of template objects

### GET /api/templates/:id
- Description: Get a specific template
- Authentication: Required
- Response: Template object

## Subscription Endpoints

### GET /api/subscriptions/plans
- Description: Get available subscription plans
- Response: Array of subscription plan objects

### POST /api/subscriptions/subscribe
- Description: Subscribe to a premium plan
- Authentication: Required
- Request Body:
  ```json
  {
    "planId": "premium_monthly",
    "paymentMethod": "card",
    "paymentDetails": {
      // Payment details
    }
  }
  ```
- Response: Subscription details

### GET /api/subscriptions/status
- Description: Get current subscription status
- Authentication: Required
- Response: Subscription status object

### POST /api/subscriptions/cancel
- Description: Cancel current subscription
- Authentication: Required
- Response: Updated subscription status

## Affiliate Endpoints

### GET /api/affiliates
- Description: Get all affiliate links
- Authentication: Required
- Response: Array of affiliate link objects

### POST /api/affiliates/click/:id
- Description: Record a click on an affiliate link
- Request Body: None
- Response: Updated affiliate link object
