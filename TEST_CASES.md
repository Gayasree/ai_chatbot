# Test Cases - AI Learning Companion

## Test Suite Overview

This document contains comprehensive test cases to verify all functionality of the AI Learning Companion system.

---

## Test Category 1: PDF Upload Functionality

### TC-001: Valid PDF Upload
**Objective**: Verify successful upload of valid PDF file

**Prerequisites**: Application running, home page loaded

**Steps**:
1. Navigate to home page (http://localhost:5000)
2. Click "Choose PDF File" button
3. Select a valid PDF file (< 16MB)
4. Click "Upload & Start Learning"

**Expected Result**:
- Success message displayed: "PDF uploaded successfully! Redirecting to chatbot..."
- Automatic redirect to /chatbot page within 1-2 seconds
- No error messages

**Status**: [ ] Pass [ ] Fail

---

### TC-002: Invalid File Type
**Objective**: Verify rejection of non-PDF files

**Steps**:
1. Navigate to home page
2. Click "Choose PDF File"
3. Select a .docx or .txt file
4. Click "Upload & Start Learning"

**Expected Result**:
- Error message: "Only PDF files are allowed"
- No redirect
- User remains on home page

**Status**: [ ] Pass [ ] Fail

---

### TC-003: No File Selected
**Objective**: Verify handling of empty upload

**Steps**:
1. Navigate to home page
2. Click "Upload & Start Learning" without selecting file

**Expected Result**:
- Browser validation message: "Please select a file"
- Form does not submit

**Status**: [ ] Pass [ ] Fail

---

### TC-004: Large File Upload
**Objective**: Verify handling of files exceeding size limit

**Steps**:
1. Navigate to home page
2. Select PDF file > 16MB
3. Click "Upload & Start Learning"

**Expected Result**:
- Error message about file size limit
- Upload rejected

**Status**: [ ] Pass [ ] Fail

---

## Test Category 2: Chatbot Functionality

### TC-005: Basic Question-Answer
**Objective**: Verify chatbot responds to relevant questions

**Prerequisites**: PDF uploaded successfully

**Steps**:
1. Navigate to chatbot page
2. Type question related to PDF content
3. Click "Send"

**Expected Result**:
- User message appears in chat (right-aligned, purple background)
- "Thinking..." indicator appears briefly
- Bot response appears (left-aligned, gray background)
- Response is relevant to question
- Response time < 3 seconds

**Status**: [ ] Pass [ ] Fail

---

### TC-006: Multiple Questions
**Objective**: Verify handling of consecutive questions

**Steps**:
1. Ask first question, wait for response
2. Ask second question, wait for response
3. Ask third question, wait for response

**Expected Result**:
- All messages displayed in chronological order
- Each question gets unique response
- Chat scrolls to bottom automatically
- No previous messages lost

**Status**: [ ] Pass [ ] Fail

---

### TC-007: Empty Question
**Objective**: Verify handling of empty input

**Steps**:
1. Leave question input empty
2. Click "Send"

**Expected Result**:
- Form does not submit
- No message added to chat
- Input field remains focused

**Status**: [ ] Pass [ ] Fail

---

### TC-008: Out-of-Scope Question
**Objective**: Verify handling of irrelevant questions

**Prerequisites**: Computer Science PDF uploaded

**Steps**:
1. Ask question unrelated to PDF (e.g., "What is cooking?")
2. Click "Send"

**Expected Result**:
- Bot responds with: "I couldn't find relevant information in the uploaded PDF..."
- Suggests rephrasing or asking about covered topics
- No false information provided

**Status**: [ ] Pass [ ] Fail

---

### TC-009: Long Question
**Objective**: Verify handling of lengthy questions

**Steps**:
1. Type question with 100+ words
2. Click "Send"

**Expected Result**:
- Question accepted and displayed
- Bot processes and responds appropriately
- No truncation or errors

**Status**: [ ] Pass [ ] Fail

---

### TC-010: Special Characters in Question
**Objective**: Verify handling of special characters

**Steps**:
1. Type question with special characters: "What is ML? (Machine Learning)"
2. Click "Send"

**Expected Result**:
- Question displayed correctly
- Special characters rendered properly
- Bot responds normally

**Status**: [ ] Pass [ ] Fail

---

## Test Category 3: Study Guidance

### TC-011: Summary Generation
**Objective**: Verify summary appears after question

**Steps**:
1. Ask a question
2. Wait for response
3. Check Study Guidance panel

**Expected Result**:
- Summary section appears with 📝 icon
- Summary is concise (2-3 sentences)
- Summary relates to question topic
- Text is readable and properly formatted

**Status**: [ ] Pass [ ] Fail

---

### TC-012: Key Points Display
**Objective**: Verify key points extraction

**Steps**:
1. Ask a question
2. Check Key Points section in Study Guidance

**Expected Result**:
- Key Points section appears with 🔑 icon
- Maximum 4 bullet points displayed
- Each point is meaningful and relevant
- Bullet points properly formatted

**Status**: [ ] Pass [ ] Fail

---

### TC-013: Learning Outcome Generation
**Objective**: Verify learning outcome statement

**Steps**:
1. Ask a question
2. Check Learning Outcome section

**Expected Result**:
- Learning Outcome section appears with 🎯 icon
- Statement starts with "After studying this topic, you will be able to..."
- Statement is relevant to question
- Displayed in distinct purple box

**Status**: [ ] Pass [ ] Fail

---

### TC-014: Guidance Update on New Question
**Objective**: Verify guidance updates with each question

**Steps**:
1. Ask first question, note guidance content
2. Ask different question
3. Compare guidance content

**Expected Result**:
- Guidance panel updates with new content
- Previous guidance replaced (not appended)
- New content relevant to new question

**Status**: [ ] Pass [ ] Fail

---

## Test Category 4: Navigation

### TC-015: Home to Chatbot Navigation
**Objective**: Verify navigation from home to chatbot

**Steps**:
1. On home page, click "Chatbot" in navigation
2. Observe page change

**Expected Result**:
- Chatbot page loads
- "Chatbot" link highlighted in nav
- Welcome message visible in chat

**Status**: [ ] Pass [ ] Fail

---

### TC-016: Chatbot to About Navigation
**Objective**: Verify navigation to about page

**Steps**:
1. On chatbot page, click "About Us" in navigation

**Expected Result**:
- About page loads
- "About Us" link highlighted
- All content visible and formatted

**Status**: [ ] Pass [ ] Fail

---

### TC-017: About to Home Navigation
**Objective**: Verify return to home page

**Steps**:
1. On about page, click "Home" in navigation

**Expected Result**:
- Home page loads
- "Home" link highlighted
- Upload form visible

**Status**: [ ] Pass [ ] Fail

---

### TC-018: Logo Click Navigation
**Objective**: Verify logo returns to home

**Steps**:
1. From any page, click "AI Learning Companion" logo

**Expected Result**:
- Home page loads
- Consistent behavior from all pages

**Status**: [ ] Pass [ ] Fail

---

## Test Category 5: UI/UX

### TC-019: Responsive Design - Desktop
**Objective**: Verify layout on desktop screen

**Steps**:
1. Open application on desktop browser (1920x1080)
2. Navigate through all pages

**Expected Result**:
- All elements visible and properly aligned
- No horizontal scrolling
- Text readable
- Images/icons display correctly

**Status**: [ ] Pass [ ] Fail

---

### TC-020: Responsive Design - Tablet
**Objective**: Verify layout on tablet screen

**Steps**:
1. Resize browser to 768px width
2. Navigate through all pages

**Expected Result**:
- Layout adjusts appropriately
- Chatbot and guidance stack vertically
- All features accessible
- No overlapping elements

**Status**: [ ] Pass [ ] Fail

---

### TC-021: Responsive Design - Mobile
**Objective**: Verify layout on mobile screen

**Steps**:
1. Resize browser to 375px width
2. Navigate through all pages

**Expected Result**:
- Single column layout
- Touch-friendly buttons
- Readable text
- Functional navigation

**Status**: [ ] Pass [ ] Fail

---

### TC-022: Color Scheme and Branding
**Objective**: Verify consistent styling

**Steps**:
1. Review all pages for color consistency

**Expected Result**:
- Purple gradient theme consistent
- White backgrounds for content
- Readable text contrast
- Professional appearance

**Status**: [ ] Pass [ ] Fail

---

### TC-023: Loading Indicators
**Objective**: Verify user feedback during processing

**Steps**:
1. Upload PDF, observe feedback
2. Ask question, observe feedback

**Expected Result**:
- "Uploading and processing PDF..." message during upload
- "Thinking..." indicator during question processing
- Clear visual feedback for all actions

**Status**: [ ] Pass [ ] Fail

---

## Test Category 6: Error Handling

### TC-024: No PDF Uploaded Before Question
**Objective**: Verify error when asking without PDF

**Steps**:
1. Navigate directly to /chatbot (without uploading PDF)
2. Try to ask a question

**Expected Result**:
- Error message: "Please upload a PDF first"
- User directed to upload PDF

**Status**: [ ] Pass [ ] Fail

---

### TC-025: Corrupted PDF Upload
**Objective**: Verify handling of corrupted PDF

**Steps**:
1. Attempt to upload corrupted/damaged PDF file

**Expected Result**:
- Error message about PDF processing failure
- User can try again with different file

**Status**: [ ] Pass [ ] Fail

---

### TC-026: Network Error Handling
**Objective**: Verify behavior during network issues

**Steps**:
1. Disconnect network
2. Try to upload PDF or ask question

**Expected Result**:
- Appropriate error message
- No application crash
- User can retry when connection restored

**Status**: [ ] Pass [ ] Fail

---

### TC-027: Session Timeout
**Objective**: Verify handling of expired session

**Steps**:
1. Upload PDF
2. Wait extended period (30+ minutes)
3. Try to ask question

**Expected Result**:
- Appropriate message about session expiry
- Option to re-upload PDF

**Status**: [ ] Pass [ ] Fail

---

## Test Category 7: Content Quality

### TC-028: Answer Accuracy
**Objective**: Verify answers come from PDF only

**Steps**:
1. Upload PDF with specific content
2. Ask question about that content
3. Verify answer matches PDF

**Expected Result**:
- Answer contains information from PDF
- No external information added
- Accurate representation of PDF content

**Status**: [ ] Pass [ ] Fail

---

### TC-029: Summary Relevance
**Objective**: Verify summary quality

**Steps**:
1. Ask question
2. Read generated summary
3. Compare with PDF content

**Expected Result**:
- Summary captures main points
- Concise (2-3 sentences)
- Relevant to question
- Grammatically correct

**Status**: [ ] Pass [ ] Fail

---

### TC-030: Key Points Quality
**Objective**: Verify key points are meaningful

**Steps**:
1. Ask question
2. Review key points

**Expected Result**:
- Points are distinct (not repetitive)
- Each point adds value
- Maximum 4 points
- Clear and concise

**Status**: [ ] Pass [ ] Fail

---

## Test Category 8: Performance

### TC-031: Response Time
**Objective**: Verify acceptable response times

**Steps**:
1. Ask 5 different questions
2. Measure response time for each

**Expected Result**:
- Average response time < 2 seconds
- No response takes > 5 seconds
- Consistent performance

**Status**: [ ] Pass [ ] Fail

---

### TC-032: PDF Processing Time
**Objective**: Verify upload processing speed

**Steps**:
1. Upload 5-page PDF, measure time
2. Upload 20-page PDF, measure time

**Expected Result**:
- 5-page PDF: < 5 seconds
- 20-page PDF: < 15 seconds
- Progress indication shown

**Status**: [ ] Pass [ ] Fail

---

### TC-033: Multiple Concurrent Users
**Objective**: Verify system handles multiple sessions

**Steps**:
1. Open application in 3 different browsers
2. Upload different PDFs in each
3. Ask questions simultaneously

**Expected Result**:
- Each session independent
- No cross-contamination of data
- All sessions function normally

**Status**: [ ] Pass [ ] Fail

---

## Test Category 9: Security

### TC-034: File Type Validation
**Objective**: Verify only PDFs accepted

**Steps**:
1. Try uploading .exe file
2. Try uploading .js file

**Expected Result**:
- Both rejected
- Error message displayed
- No file executed or processed

**Status**: [ ] Pass [ ] Fail

---

### TC-035: SQL Injection Prevention
**Objective**: Verify protection against SQL injection

**Steps**:
1. Type question with SQL code: "'; DROP TABLE users; --"
2. Submit question

**Expected Result**:
- Question treated as plain text
- No database errors
- Safe handling of special characters

**Status**: [ ] Pass [ ] Fail

---

### TC-036: XSS Prevention
**Objective**: Verify protection against XSS attacks

**Steps**:
1. Type question with script tag: "<script>alert('XSS')</script>"
2. Submit question

**Expected Result**:
- Script not executed
- Text displayed safely (escaped)
- No alert popup

**Status**: [ ] Pass [ ] Fail

---

## Test Category 10: About Page

### TC-037: About Page Content
**Objective**: Verify all about page sections

**Steps**:
1. Navigate to About Us page
2. Review all sections

**Expected Result**:
- Mission section visible
- Problem section with 4 points
- Solution section with features
- Developer information present
- Future vision section
- "Get Started" button functional

**Status**: [ ] Pass [ ] Fail

---

### TC-038: About Page Links
**Objective**: Verify all links work

**Steps**:
1. Click "Get Started" button on about page

**Expected Result**:
- Redirects to home page
- Button styled correctly
- Smooth navigation

**Status**: [ ] Pass [ ] Fail

---

## Test Summary Template

```
Total Test Cases: 38
Passed: ___
Failed: ___
Blocked: ___
Not Executed: ___

Pass Rate: ____%

Critical Issues Found: ___
Major Issues Found: ___
Minor Issues Found: ___

Tested By: _______________
Date: _______________
Environment: _______________
```

---

## Bug Report Template

```
Bug ID: BUG-XXX
Title: [Short description]
Severity: [Critical/Major/Minor]
Priority: [High/Medium/Low]

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:


Actual Result:


Screenshots: [If applicable]

Environment:
- Browser: 
- OS: 
- Python Version: 

Additional Notes:

```

---

## Regression Test Checklist

After any code changes, verify:
- [ ] PDF upload still works
- [ ] Questions get responses
- [ ] Study guidance displays
- [ ] Navigation functions
- [ ] No console errors
- [ ] Styling intact
- [ ] Mobile responsive

---

**Use this document to systematically test all features before submission or demonstration.**
