# CrediSure Database Schema

## User Collection
```
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  phone: String,
  accountType: String (enum: ['free', 'premium']),
  subscriptionStatus: String (enum: ['active', 'inactive', 'trial']),
  subscriptionExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## DisputeLetter Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  personalInfo: {
    fullName: String (required),
    address: {
      street: String (required),
      city: String (required),
      state: String (required),
      zipCode: String (required)
    },
    phone: String,
    email: String
  },
  creditorInfo: {
    name: String (required),
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    accountNumber: String (required)
  },
  disputeDetails: {
    category: String (enum: ['latePayment', 'collection', 'personalInfo', 'account']),
    subCategory: String (required),
    reason: String (required),
    additionalDetails: String
  },
  letterFormat: String (enum: ['metro2', 'legal']),
  letterContent: String,
  status: String (enum: ['draft', 'generated', 'sent']),
  createdAt: Date,
  updatedAt: Date
}
```

## DisputeTemplate Collection
```
{
  _id: ObjectId,
  category: String (enum: ['latePayment', 'collection', 'personalInfo', 'account']),
  subCategory: String,
  format: String (enum: ['metro2', 'legal']),
  templateTitle: String,
  templateContent: String,
  isPremium: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Transaction Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  amount: Number,
  currency: String (default: 'USD'),
  paymentMethod: String,
  description: String,
  status: String (enum: ['pending', 'completed', 'failed']),
  type: String (enum: ['subscription', 'oneTimePurchase']),
  productId: String,
  createdAt: Date
}
```

## AffiliateLink Collection
```
{
  _id: ObjectId,
  serviceName: String (required),
  serviceUrl: String (required),
  affiliateCode: String (required),
  description: String,
  category: String,
  isActive: Boolean (default: true),
  clicks: Number (default: 0),
  conversions: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```
