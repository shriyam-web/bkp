# Normal Membership Form - Testing Guide

## Overview
This document provides a comprehensive testing guide for the Normal (Humdard) Membership form functionality in the Bahujan Kranti Party application.

## Manual Testing Steps

### Test 1: Form Rendering
**Objective:** Verify that all form fields are displayed correctly

1. Navigate to the Join page (`/join` or `/[locale]/join`)
2. Click on the "Normal Membership" card
3. **Expected Results:**
   - Form displays with party name "बहुजन क्रान्ति पार्टी (Marxism - Ambedkarism)"
   - All required fields are visible:
     - नाम (Name) *
     - जन्म तिथि (Date of Birth) *
     - आयु (Age) *
     - पिता/पति का नाम (Father's/Husband's Name) *
     - पता (Address) *
     - राज्य (State) * (dropdown)
     - जिला/शहर (District/City) *
     - ईमेल (Email)
     - मो नं (Mobile No.) *
     - पोलिंग स्टेशन का नाम (Polling Station Name)
     - विधानसभा निर्वाचन क्षेत्र (Assembly Constituency)
     - दिनांक (Date) *

### Test 2: Form Data Entry
**Objective:** Verify form can accept and store user input

1. Fill in the form with sample data:
   ```
   Name: राज कुमार (Raj Kumar)
   Date of Birth: 1990-05-15
   Age: 34
   Father's/Husband's Name: कमल सिंह (Kamal Singh)
   Address: 123 मुख्य स्ट्रीट (Main Street), नई दिल्ली (New Delhi)
   State: Delhi
   District: New Delhi
   Email: raj@example.com
   Mobile No.: +91 9876543210
   Polling Station: बिड़ला स्कूल (Birla School)
   Assembly Constituency: नई दिल्ली
   Date: 2024-01-15
   ```

2. **Expected Results:**
   - All fields accept input without errors
   - State dropdown works properly
   - Mobile number accepts +91 prefix and up to 10 digits
   - Date fields show proper date picker

### Test 3: Pledge Modal Display
**Objective:** Verify pledge modal appears on form submission

1. Complete the form with valid data (as shown in Test 2)
2. Click "आवेदन जमा करें" (Submit Application) button
3. **Expected Results:**
   - Modal dialog appears with title "बहुजन क्रान्ति पार्टी"
   - Pledge text displays:
     ```
     घोषणापत्र (शपथ) - सदस्यता प्रपत्र
     
     मैं बहुजन क्रांति पार्टी के लक्ष्यों तथा उद्देश्यों को स्वीकार करता/करती हूँ 
     और उसके संविधान का पालन करने तथा पार्टी के फैसलों को वफादारी से मानने 
     की शपथ लेता/लेती हूँ।
     
     मैं समाजवाद के आदर्शों पर चलने की चेष्टा करूँगा/करूँगी और इस पार्टी तथा 
     शोषित जनता के हितों को अपने निजी हितों से ऊपर रखूँगा/रखूँगी।
     
     मैं मजदूर वर्ग, मेहनतकश जनता तथा सर्वहारा वर्ग की आजीवन सेवा करूँगा/करूँगी।
     ```

### Test 4: Pledge Acceptance Checkboxes
**Objective:** Verify checkboxes are required before submission

1. Modal is displayed (from Test 3)
2. Attempt to click "जमा करें" (Submit) button without checking any boxes
3. **Expected Results:**
   - Submit button is disabled (greyed out)
   - Cannot submit the form

4. Check the first checkbox: "मैं ने ऊपर दिए गए घोषणापत्र को पढ़ा और इससे सहमत हूँ"
5. **Expected Results:**
   - Submit button remains disabled
   - Both checkboxes must be checked

6. Check the second checkbox: "मैं प्रमाणित करता/करती हूँ कि मेरा दर्ज सभी सूचना सत्य है"
7. **Expected Results:**
   - Submit button becomes enabled
   - Can now submit the form

### Test 5: Form Submission
**Objective:** Verify form submits successfully to the API

1. Complete all steps in Test 4 (both checkboxes checked)
2. Click "जमा करें" (Submit) button
3. **Expected Results:**
   - Loading state shows "जमा किया जा रहा है..." (Submitting...)
   - API call is made to `/api/membership` endpoint
   - Success confirmation page appears with:
     - Green checkmark icon
     - "बहुजन क्रांति पार्टी में स्वागत है!" (Welcome message)
     - Unique Member ID
     - "किसी और को आमंत्रित करें" (Invite Someone Else) button
     - Print button option

### Test 6: Modal Cancel Button
**Objective:** Verify user can cancel and return to form

1. Display pledge modal (from Test 3)
2. Click "रद्द करें" (Cancel) button
3. **Expected Results:**
   - Modal closes
   - User returns to the form with all previously entered data intact
   - Form can be edited and resubmitted

### Test 7: Language Toggle
**Objective:** Verify bilingual support (Hindi/English)

1. Complete the form with English locale
2. Navigate to Hindi locale (`/hi/join`)
3. Click on Normal Membership
4. **Expected Results:**
   - All labels switch to Hindi:
     - "नाम" instead of "Name"
     - "जन्म तिथि" instead of "Date of Birth"
     - "आयु" instead of "Age"
     - etc.
   
5. Pledge text displays in Hindi
6. Button text: "आवेदन जमा करें" instead of "Submit Application"

### Test 8: Styling & UI
**Objective:** Verify correct styling for Normal Membership

1. Compare Normal Membership card styling with Active Membership card:
   - **Normal Membership**: Blue theme
     - Card border: Blue hover effect
     - Form heading: Blue color (instead of red)
     - Submit button: Blue gradient
   
   - **Active Membership**: Red theme
     - Card border: Red hover effect
     - Form heading: Red color
     - Submit button: Red gradient

### Test 9: Responsive Design
**Objective:** Verify form works on different screen sizes

1. Test on Desktop (1920x1080)
   - Form displays in 2-column grid layout
   - All fields are properly spaced

2. Test on Tablet (768x1024)
   - Form adjusts to responsive layout
   - Fields remain accessible and readable

3. Test on Mobile (375x667)
   - Form stack vertically
   - All fields are touchable without zooming
   - Buttons are properly sized for touch

### Test 10: Form Validation
**Objective:** Verify required fields validation

1. Submit form without filling required fields (*):
2. **Expected Results:**
   - Browser shows native validation: "Please fill out this field"
   - Form does not submit
   - User is prompted to complete required fields

3. Test individual fields:
   - Date of Birth: Must be valid date format
   - Age: Must be between 1-120
   - Mobile No.: Must accept +91 prefix, max 10 digits
   - Pincode (if present): Must be 6 digits

## Code Quality Checks

### TypeScript Compilation
```bash
npm run typecheck
```
**Expected Result:** No TypeScript errors related to join-page.tsx

### ESLint
```bash
npm run lint
```
**Expected Result:** No errors on join-page.tsx (only warnings about pre-existing issues)

## API Integration Testing

### Expected API Endpoint
```
POST /api/membership
```

**Request Body:**
```json
{
  "name": "राज कुमार",
  "dateOfBirth": "1990-05-15",
  "age": "34",
  "fathersOrHusbandsName": "कमल सिंह",
  "address": "123 मुख्य स्ट्रीट",
  "state": "Delhi",
  "district": "New Delhi",
  "email": "raj@example.com",
  "mobileNo": "+91 9876543210",
  "pollingStation": "बिड़ला स्कूल",
  "constituency": "नई दिल्ली",
  "date": "2024-01-15",
  "membershipType": "Normal Membership"
}
```

**Expected Response:**
```json
{
  "memberId": "UNIQUE_ID_123456",
  "message": "Membership registered successfully"
}
```

## Troubleshooting

### Issue: Form not submitting
- **Check:** All required fields are filled
- **Check:** Both pledge checkboxes are checked
- **Check:** Browser console for JavaScript errors

### Issue: Pledge modal not appearing
- **Check:** Form submitted successfully (no validation errors)
- **Check:** Membership type is "Normal Membership"
- **Check:** Browser allows modals to display

### Issue: Language not switching
- **Check:** Locale is correctly passed in URL
- **Check:** TranslationContext is properly initialized

## Summary of Changes

The Normal Membership form includes:
- ✅ All required fields as specified
- ✅ Hindi pledge texts in modal
- ✅ Bilingual support (Hindi/English)
- ✅ Form validation
- ✅ Pledge acceptance checkboxes
- ✅ Blue styling differentiation from Active Membership
- ✅ Mobile responsive design
- ✅ Proper error handling
- ✅ Loading states during submission

## Test Results
- [x] Form fields render correctly
- [x] All data input works as expected
- [x] Pledge modal displays with correct Hindi text
- [x] Checkboxes properly control submit button
- [x] Form submission triggers API call
- [x] Bilingual support works
- [x] Styling matches specifications
- [x] TypeScript compilation passes
- [x] ESLint checks pass
