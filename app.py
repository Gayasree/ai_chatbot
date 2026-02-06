# Flask Backend for AI Learning Companion
from flask import Flask, render_template, request, jsonify, session
import os
from werkzeug.utils import secure_filename
import secrets
from chatbot_logic import PDFProcessor, Chatbot

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

pdf_processors = {}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/chatbot')
def chatbot_page():
    return render_template('chatbot.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/upload', methods=['POST'])
def upload_pdf():
    try:
        if 'pdf' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['pdf']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'Only PDF files are allowed'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        processor = PDFProcessor(filepath)
        text = processor.extract_text()
        chunks = processor.create_chunks(text)
        
        session_id = session.get('session_id', secrets.token_hex(8))
        session['session_id'] = session_id
        
        chatbot = Chatbot(chunks, full_text=text)
        pdf_processors[session_id] = chatbot
        
        return jsonify({
            'success': True,
            'message': 'PDF uploaded and processed successfully',
            'filename': filename
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data.get('question', '').strip()
        
        if not question:
            return jsonify({'error': 'Question cannot be empty'}), 400
        
        session_id = session.get('session_id')
        
        if not session_id or session_id not in pdf_processors:
            return jsonify({'error': 'Please upload a PDF first'}), 400
        
        chatbot = pdf_processors[session_id]
        response = chatbot.get_response(question)
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-questions', methods=['GET'])
def generate_questions():
    try:
        session_id = session.get('session_id')
        
        if not session_id or session_id not in pdf_processors:
            return jsonify({'error': 'Please upload a PDF first'}), 400
        
        chatbot = pdf_processors[session_id]
        questions = chatbot.generate_all_possible_questions()
        
        return jsonify({'questions': questions})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("AI Learning Companion Starting...")
    print("="*50)
    print("Open: http://localhost:5000")
    print("="*50 + "\n")
    app.run(debug=True, port=5000)
