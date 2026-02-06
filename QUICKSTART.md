# Quick Start Guide - AI Learning Companion

## Setup Instructions (5 minutes)

### Step 1: Install Python Dependencies
Open terminal/command prompt in the project folder and run:
```bash
pip install -r requirements.txt
```

### Step 2: Start the Application
```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

### Step 3: Open in Browser
Navigate to: http://localhost:5000

## Testing the Application

### Test 1: Upload PDF
1. Go to Home page
2. Click "Choose PDF File"
3. Select any academic PDF (lecture notes, textbook chapter, research paper)
4. Click "Upload & Start Learning"
5. Wait for success message and automatic redirect

### Test 2: Ask Questions
1. On Chatbot page, type a question related to your PDF content
   Example: "What is machine learning?"
2. Press Send
3. View the AI-generated answer in the chat
4. Check the Study Guidance panel on the right for:
   - Summary
   - Key Points
   - Learning Outcome

### Test 3: Multiple Questions
1. Ask follow-up questions
2. Notice how answers are always based on PDF content
3. Try questions outside PDF scope - system will inform you

### Test 4: About Page
1. Navigate to About Us page
2. Review project information and problem-solution explanation

## Sample Questions to Try

If you upload a Computer Science PDF:
- "What is an algorithm?"
- "Explain data structures"
- "What are the key concepts?"

If you upload a Mathematics PDF:
- "What is calculus?"
- "Explain derivatives"
- "What are the main formulas?"

## Troubleshooting

### Issue: Module not found error
**Solution**: Run `pip install -r requirements.txt` again

### Issue: PDF upload fails
**Solution**: 
- Ensure PDF is not password-protected
- Check file size (max 16MB)
- Verify it's a valid PDF file

### Issue: No answer generated
**Solution**: 
- Make sure PDF was uploaded successfully
- Try rephrasing your question
- Ensure question relates to PDF content

### Issue: Port 5000 already in use
**Solution**: 
- Stop other Flask applications
- Or change port in app.py: `app.run(debug=True, port=5001)`

## Project Demonstration Tips

1. **Prepare a sample PDF**: Use a well-structured academic PDF for best results
2. **Prepare questions**: Have 3-5 questions ready that relate to the PDF content
3. **Highlight features**: Show upload, chat, and study guidance sections
4. **Explain the problem**: Reference the problem statement and how each feature solves it

## Key Points to Mention

✅ Solves passive learning by enabling interactive Q&A
✅ Provides real-time doubt clarification through chatbot
✅ Reduces cognitive load with summaries and key points
✅ Aligns with learning outcomes through outcome statements
✅ Uses AI/ML (TF-IDF, Cosine Similarity) for intelligent responses
✅ Answers come ONLY from uploaded PDF content

## Architecture Overview

```
Student uploads PDF → Text extraction → Chunking
                                          ↓
Student asks question → TF-IDF vectorization → Similarity matching
                                          ↓
                        Relevant chunks → Answer generation
                                          ↓
                        Display: Answer + Summary + Key Points + Learning Outcome
```

## File Descriptions

- **app.py**: Flask routes and request handling
- **chatbot_logic.py**: PDF processing, TF-IDF, similarity matching
- **templates/**: HTML pages (index, chatbot, about)
- **static/css/style.css**: All styling
- **static/js/upload.js**: PDF upload logic
- **static/js/chatbot.js**: Chat interaction logic

## Success Criteria

Your project is working correctly if:
1. ✅ PDF uploads successfully
2. ✅ Questions generate relevant answers from PDF
3. ✅ Study guidance shows summary, key points, and learning outcome
4. ✅ Questions outside PDF scope are handled appropriately
5. ✅ All pages (Home, Chatbot, About) are accessible

---

**Ready to present! Good luck with your project! 🚀**
