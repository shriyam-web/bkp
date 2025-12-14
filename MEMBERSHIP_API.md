# Membership API Documentation

## Endpoint: POST /api/membership

### Description
Creates a new membership application in MongoDB with the required fields.

### Request Body

```json
{
  "name": "string (required)",
  "age": "number (required, 1-120)",
  "fathersOrHusbandsName": "string (required)",
  "address": "string (required)",
  "pincode": "string (required, 6 digits)",
  "mobileNo": "string (required)",
  "voterIdCardNo": "string (required)",
  "date": "string (required, ISO date format YYYY-MM-DD)",
  "membershipType": "string (required, enum: 'Active Membership' | 'Normal Membership')"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/api/membership \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "age": 35,
    "fathersOrHusbandsName": "Vinod Kumar",
    "address": "123 Main Street, New Delhi",
    "pincode": "110001",
    "mobileNo": "+91 9876543210",
    "voterIdCardNo": "VID123456789",
    "date": "2025-12-14",
    "membershipType": "Active Membership"
  }'
```

### Example Response (Success)

**Status: 201 Created**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "age": 35,
    "fathersOrHusbandsName": "Vinod Kumar",
    "address": "123 Main Street, New Delhi",
    "pincode": "110001",
    "mobileNo": "+91 9876543210",
    "voterIdCardNo": "VID123456789",
    "date": "2025-12-14T00:00:00.000Z",
    "membershipType": "Active Membership",
    "createdAt": "2025-12-14T18:30:00.000Z",
    "updatedAt": "2025-12-14T18:30:00.000Z"
  }
}
```

### Example Response (Error)

**Status: 500 Internal Server Error**

```json
{
  "success": false,
  "error": "Failed to create membership"
}
```

### Error Handling

- **Missing Required Fields**: The API returns 400 with missing field validation
- **Invalid Data Type**: Database will reject if age is not a number
- **Database Connection**: Returns 500 if MongoDB connection fails
- **Invalid Request Format**: Returns 500 if JSON is malformed

### MongoDB Collection Schema

```javascript
{
  name: String (required),
  age: Number (required),
  fathersOrHusbandsName: String (required),
  address: String (required),
  pincode: String (required),
  mobileNo: String (required),
  voterIdCardNo: String (required),
  date: Date (required),
  membershipType: String (required, enum: 'Active Membership' | 'Normal Membership'),
  createdAt: Date (automatically added),
  updatedAt: Date (automatically added)
}
```

### Testing

#### Option 1: Using the Test Script

```bash
node test-membership-api.js
```

#### Option 2: Using cURL

```bash
curl -X POST http://localhost:3000/api/membership \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 28,
    "fathersOrHusbandsName": "James Doe",
    "address": "456 Oak Road, Mumbai",
    "pincode": "400001",
    "mobileNo": "+91 8765432109",
    "voterIdCardNo": "VID987654321",
    "date": "2025-12-14",
    "membershipType": "Normal Membership"
  }'
```

#### Option 3: Using Postman

1. Create a new POST request
2. URL: `http://localhost:3000/api/membership`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Jane Smith",
  "age": 42,
  "fathersOrHusbandsName": "Robert Smith",
  "address": "789 Pine Lane, Bangalore",
  "pincode": "560001",
  "mobileNo": "+91 9123456789",
  "voterIdCardNo": "VID456789123",
  "date": "2025-12-14",
  "membershipType": "Active Membership"
}
```

### Notes

- The `date` field should be in ISO format (YYYY-MM-DD)
- The API automatically adds `createdAt` and `updatedAt` timestamps
- All responses are in JSON format
- The MongoDB connection is automatically pooled and reused
