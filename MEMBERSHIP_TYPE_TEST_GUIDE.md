# Membership Type Field - Testing Guide

## Overview
The Membership Type field has been added to the `/join` membership form. Members can now select between:
- **Active Membership** - For active participants
- **Normal Membership** - For regular members

---

## Files Updated

### 1. **Schema Update** (`models/Membership.ts`)
```typescript
membershipType: {
  type: String,
  enum: ['Active Membership', 'Normal Membership'],
  required: true,
}
```

### 2. **Form Update** (`app/join/page.tsx`)
- Added `membershipType` field to form state
- Added select dropdown with two membership options
- Styled with consistent UI/UX matching the form

### 3. **Documentation Update** (`MEMBERSHIP_API.md`)
- Updated request body schema
- Updated example requests
- Updated example responses
- Updated MongoDB schema documentation

---

## Testing Instructions

### Method 1: Using the Test Script (Recommended)

**Requirements:**
- Node.js installed
- Development server running (`npm run dev`)
- MongoDB Atlas cluster whitelisted

**Steps:**
```bash
# 1. Open terminal/command prompt
# 2. Navigate to project directory
cd d:\project-bolt-sb1-3rugxqnu\project

# 3. Run the test script
node test-membership-api.js
```

**Expected Output:**
```
============================================================
Test 1: Membership Type - Active Membership
============================================================
Sending data: {...}

✅ API Test Successful!
Status: 201
Response Data:
  Name: Rajesh Kumar
  Age: 35
  Membership Type: Active Membership
  Voter ID: VID123456789
  Created At: 2025-12-14T19:00:00.000Z

============================================================
Test 2: Membership Type - Normal Membership
============================================================
Sending data: {...}

✅ API Test Successful!
Status: 201
Response Data:
  Name: Priya Sharma
  Age: 28
  Membership Type: Normal Membership
  Voter ID: VID987654321
  Created At: 2025-12-14T19:00:01.000Z

============================================================
✅ All tests completed!
Check MongoDB Atlas to verify data was saved correctly
============================================================
```

### Method 2: Using cURL (Manual Testing)

**Active Membership Request:**
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

**Normal Membership Request:**
```bash
curl -X POST http://localhost:3000/api/membership \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Sharma",
    "age": 28,
    "fathersOrHusbandsName": "Rajesh Sharma",
    "address": "456 Oak Road, Mumbai",
    "pincode": "400001",
    "mobileNo": "+91 8765432109",
    "voterIdCardNo": "VID987654321",
    "date": "2025-12-14",
    "membershipType": "Normal Membership"
  }'
```

### Method 3: Using Postman

**Steps:**
1. Open Postman
2. Create new POST request
3. URL: `http://localhost:3000/api/membership`
4. Headers Tab:
   - Key: `Content-Type`
   - Value: `application/json`
5. Body Tab (raw, JSON):
```json
{
  "name": "Test User",
  "age": 30,
  "fathersOrHusbandsName": "Parent Name",
  "address": "Address",
  "pincode": "123456",
  "mobileNo": "+91 9999999999",
  "voterIdCardNo": "VID12345678",
  "date": "2025-12-14",
  "membershipType": "Active Membership"
}
```
6. Click **Send**

### Method 4: Using the Web Form (UI Testing)

**Steps:**
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/join`
3. Fill in all form fields:
   - Name
   - Age
   - Father's/Husband's Name
   - Address
   - Pincode
   - Mobile No.
   - Voter ID Card No.
   - Date
4. Select **Membership Type** dropdown
5. Choose either "Active Membership" or "Normal Membership"
6. Click **Submit Application**
7. Verify success message appears

---

## Validation Rules

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| name | String | Required | "Rajesh Kumar" |
| age | Number | Required, 1-120 | 35 |
| fathersOrHusbandsName | String | Required | "Vinod Kumar" |
| address | String | Required | "123 Main Street" |
| pincode | String | Required, 6 digits | "110001" |
| mobileNo | String | Required | "+91 9876543210" |
| voterIdCardNo | String | Required | "VID123456789" |
| date | Date | Required, ISO format | "2025-12-14" |
| membershipType | String | Required, enum | "Active Membership" or "Normal Membership" |

---

## Verification in MongoDB

### MongoDB Atlas Dashboard

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster: `cluster0`
3. Click **Browse Collections**
4. Navigate to: `<database>` > `memberships` collection
5. Verify documents contain:
   - `membershipType` field with value "Active Membership" or "Normal Membership"
   - All other required fields

### Query Example

```javascript
// Find all Active Members
db.memberships.find({ membershipType: "Active Membership" })

// Find all Normal Members
db.memberships.find({ membershipType: "Normal Membership" })

// Count members by type
db.memberships.aggregate([
  { $group: { _id: "$membershipType", count: { $sum: 1 } } }
])
```

---

## Troubleshooting

### Error: "Could not connect to any servers"
- MongoDB Atlas IP whitelist not configured
- Solution: Add your IP to Atlas Network Access settings

### Error: "membershipType is required"
- Form submission without selecting membership type
- Solution: Select membership type from dropdown before submitting

### Error: "Cast to string failed for value"
- Invalid membershipType value sent (typo)
- Solution: Must be exactly "Active Membership" or "Normal Membership"

### Form field not appearing
- Browser cache issue
- Solution: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## Success Indicators

✅ **Form Level:**
- Membership Type dropdown appears on form
- Both options selectable
- Form validates and requires selection

✅ **API Level:**
- POST request returns 201 Created status
- Response includes membershipType field
- No validation errors

✅ **Database Level:**
- Document saved in MongoDB
- membershipType field present with correct value
- Timestamps (createdAt, updatedAt) automatically added

---

## Next Steps

1. ✅ Test form on web UI
2. ✅ Verify data in MongoDB Atlas
3. ✅ Run automated test script
4. 📋 Add additional membership types if needed
5. 📋 Create admin dashboard to view membership statistics by type

---

## Files Created/Modified

| File | Status | Description |
|------|--------|-------------|
| `models/Membership.ts` | ✅ Modified | Added membershipType field |
| `app/join/page.tsx` | ✅ Modified | Added dropdown selector |
| `MEMBERSHIP_API.md` | ✅ Updated | Added field documentation |
| `test-membership-api.js` | ✅ Updated | Tests both membership types |
| `MEMBERSHIP_TYPE_TEST_GUIDE.md` | ✅ Created | This guide |

---

## Contact & Support

For issues or questions:
- Check MEMBERSHIP_API.md for API documentation
- Review test output for error messages
- Verify MongoDB Atlas connection settings
