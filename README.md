# AI Learning Companion

An AI-driven learning support system that transforms passive PDF reading into an interactive, outcome-oriented learning experience for higher education students.

## Problem Statement

Higher education students struggle with:
- **Passive Learning**: Traditional reading doesn't engage students actively
- **Lack of Real-time Support**: No instant clarification of doubts while studying
- **Cognitive Overload**: Large documents overwhelm students with too much information
- **Poor Learning Alignment**: Difficulty identifying key learning outcomes

## Solution

AI Learning Companion converts academic PDFs into interactive learning experiences by:
- Enabling natural language questions about PDF content
- Providing instant, contextual answers from the document
- Generating structured summaries and key points
- Identifying clear learning outcomes for each topic

## Features

### 1. Home Page
- Project introduction and overview
- PDF upload functionality
- Simple, student-friendly interface

### 2. Chatbot Page
- Interactive chat interface for asking questions
- AI-powered responses based on uploaded PDF content
- Real-time doubt clarification
- Study guidance section with:
  - Topic summaries
  - Key points in bullet format
  - Learning outcome statements

### 3. About Us Page
- Project background and mission
- Problem-solution explanation
- Developer information

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python Flask
- **PDF Processing**: PyPDF2
- **NLP & ML**: scikit-learn (TF-IDF, Cosine Similarity)
- **Text Processing**: Regular expressions, numpy

## Project Structure

```
Hackathon/
│
├── app.py                  # Main Flask application
├── chatbot_logic.py        # PDF processing and chatbot logic
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation
│
├── templates/             # HTML templates
│   ├── index.html         # Home page
│   ├── chatbot.html       # Chatbot interface
│   └── about.html         # About us page
│
├── static/                # Static files
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       ├── upload.js      # PDF upload handler
│       └── chatbot.js     # Chat interaction handler
│
└── uploads/               # PDF storage (created automatically)
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
python app.py
```

### Step 3: Access the Website

Open your browser and navigate to:
```
http://localhost:5000
```

## How to Use

1. **Upload PDF**
   - Go to the home page
   - Click "Choose PDF File" and select your academic PDF
   - Click "Upload & Start Learning"

2. **Ask Questions**
   - Navigate to the Chatbot page
   - Type your question in natural language
   - Receive instant answers from the PDF content

3. **View Study Guidance**
   - After asking a question, view the Study Guidance panel
   - Read the summary, key points, and learning outcomes
   - Use this structured information to reduce cognitive load

## How It Works

### PDF Processing
1. Extract text from uploaded PDF using PyPDF2
2. Split text into smaller chunks (500 characters) to reduce cognitive load
3. Store chunks for efficient retrieval

### Question Answering
1. Convert student question to TF-IDF vector
2. Calculate cosine similarity with all PDF chunks
3. Retrieve top 3 most relevant chunks
4. Generate contextual answer from relevant content

### Study Guidance Generation
1. **Summary**: Extract key sentences from relevant chunks
2. **Key Points**: Identify important statements (max 4 points)
3. **Learning Outcome**: Generate outcome statement based on question topic

## Key Algorithms

### TF-IDF (Term Frequency-Inverse Document Frequency)
- Converts text into numerical vectors
- Identifies important words in the document
- Enables semantic matching between questions and content

### Cosine Similarity
- Measures similarity between question and PDF chunks
- Returns most relevant content sections
- Ensures answers come only from uploaded PDF

## Academic Alignment

This project demonstrates:
- **Problem-Solution Thinking**: Clear identification and resolution of educational challenges
- **AI/ML Application**: Practical use of NLP and machine learning
- **Full-Stack Development**: Integration of frontend, backend, and AI logic
- **User-Centric Design**: Focus on student needs and learning outcomes

## Future Enhancements

- Support for multiple document formats (DOCX, TXT)
- Multi-document question answering
- Personalized study plans
- Progress tracking and analytics
- Collaborative learning features
- Integration with Learning Management Systems (LMS)

## Limitations

- Answers are limited to uploaded PDF content only
- PDF must contain extractable text (not scanned images)
- Best results with well-structured academic documents
- Requires internet connection for initial setup

## Contributors

Developed by Computer Science students as an academic project to improve educational outcomes through AI technology.

## License

This is an academic project developed for educational purposes.

## Contact

For questions or feedback about this project, please contact the development team through your academic institution.

---

**Built with ❤️ for better learning outcomes**
