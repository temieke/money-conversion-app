# API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "dateOfBirth": "2007-05-15",
  "phone": "+1234567890"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "subscription": {
      "status": "trial",
      "trialEndDate": "2024-08-18"
    }
  }
}
```

### Login
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## User Endpoints

### Get User Profile
**GET** `/api/users/profile`

Headers: `Authorization: Bearer {token}`

### Update User Profile
**PUT** `/api/users/profile`

Headers: `Authorization: Bearer {token}`

Request body: Any user fields to update

## Subscription Endpoints

### Get Subscription Status
**GET** `/api/subscriptions/status`

Headers: `Authorization: Bearer {token}`

Response:
```json
{
  "status": "trial",
  "trialDaysRemaining": 45,
  "trialEndDate": "2024-08-18",
  "monthlyFee": 9.99
}
```

### Upgrade to Paid Subscription
**POST** `/api/subscriptions/upgrade`

Headers: `Authorization: Bearer {token}`

Request body:
```json
{
  "paymentMethodId": "pm_stripe_id"
}
```

### Cancel Subscription
**POST** `/api/subscriptions/cancel`

Headers: `Authorization: Bearer {token}`

Response:
```json
{
  "success": true,
  "message": "Subscription cancelled successfully"
}
```

## Transaction Endpoints

### Convert and Transfer Money
**POST** `/api/transactions/convert`

Headers: `Authorization: Bearer {token}`

Request body:
```json
{
  "amount": 100,
  "currency": "USD",
  "bankAccountId": "account_id"
}
```

### Get Transaction History
**GET** `/api/transactions/history?page=1&limit=10`

Headers: `Authorization: Bearer {token}`

### Get Transaction Details
**GET** `/api/transactions/:id`

Headers: `Authorization: Bearer {token}`

## Bank Integration Endpoints

### Connect Bank Account
**POST** `/api/bank/connect`

Headers: `Authorization: Bearer {token}`

Request body:
```json
{
  "publicToken": "public_token_from_plaid"
}
```

### Get Bank Accounts
**GET** `/api/bank/accounts`

Headers: `Authorization: Bearer {token}`

## Error Responses

All errors return appropriate HTTP status codes:

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `INVALID_AGE`: User is over 17 years old
- `INVALID_CREDENTIALS`: Email or password incorrect
- `TRIAL_EXPIRED`: Free trial has ended
- `SUBSCRIPTION_REQUIRED`: User must upgrade to paid plan
- `BANK_CONNECTION_FAILED`: Bank account connection failed
