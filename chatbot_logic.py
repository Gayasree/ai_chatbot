# Ultimate AI Chatbot - Exactly Like Gemini/ChatGPT
# Answers from PDF + General AI Knowledge

import PyPDF2
import os
import re
import json
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class PDFProcessor:
    """Process PDFs and folders"""
    
    def __init__(self, path):
        self.path = path
    
    def extract_text(self):
        """Extract text from PDF or all PDFs in folder"""
        if os.path.isfile(self.path):
            return self._extract_from_file(self.path)
        elif os.path.isdir(self.path):
            return self._extract_from_folder(self.path)
        else:
            raise Exception("Invalid path")
    
    def _extract_from_file(self, file_path):
        """Extract from single PDF"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
            return text
        except Exception as e:
            raise Exception(f"Error: {e}")
    
    def _extract_from_folder(self, folder_path):
        """Extract from all PDFs in folder"""
        all_text = ""
        pdf_files = list(Path(folder_path).glob("*.pdf"))
        
        for pdf_file in pdf_files:
            try:
                all_text += f"\n\n=== {pdf_file.name} ===\n\n"
                all_text += self._extract_from_file(str(pdf_file))
            except:
                continue
        
        return all_text
    
    def create_chunks(self, text, chunk_size=3000):
        """Split text"""
        text = re.sub(r'\s+', ' ', text).strip()
        sentences = re.split(r'(?<=[.!?])\s+', text)
        
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) < chunk_size:
                current_chunk += sentence + " "
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        return chunks


class Chatbot:
    """AI Chatbot - Exactly like Gemini/ChatGPT"""
    
    def __init__(self, chunks, full_text=""):
        self.chunks = chunks
        self.full_text = full_text or " ".join(chunks)
        self.conversation_history = []
        
        # Get API key
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key:
            raise Exception("No API key found in .env file!")
        
        # Configure Gemini
        api_key = api_key.strip('"').strip("'")
        genai.configure(api_key=api_key)
        
        # Use the latest stable model
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')
        print("✅ Gemini AI Ready!")
    
    def get_summary(self):
        """Summarize the entire PDF/folder content"""
        prompt = f"""Analyze and summarize this document/folder content:

CONTENT:
{self.full_text[:20000]}

Provide a comprehensive summary in JSON format:
{{
    "overall_summary": "Detailed summary of all content (3-5 paragraphs)",
    "main_topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"],
    "key_insights": ["Insight 1", "Insight 2", "Insight 3"],
    "document_purpose": "What is this document/folder about?",
    "target_audience": "Who is this for?",
    "important_concepts": ["Concept 1", "Concept 2", "Concept 3"]
}}"""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0].strip()
            elif '```' in response_text:
                response_text = response_text.split('```')[1].split('```')[0].strip()
            
            return json.loads(response_text)
        except:
            return {
                "overall_summary": "Summary of the uploaded content",
                "main_topics": ["Various topics covered"],
                "key_insights": ["Key information from the document"],
                "document_purpose": "Educational material",
                "target_audience": "Students and learners",
                "important_concepts": ["Core concepts from the content"]
            }
    
    def get_response(self, question):
        """Get AI response - exactly like ChatGPT/Gemini"""
        
        prompt = f"""You are Gemini AI - an intelligent, helpful, and conversational assistant.

CONTEXT: You have access to some PDF documents as reference material.

PDF CONTENT:
{self.full_text[:20000]}

USER QUESTION: {question}

INSTRUCTIONS:
1. If the question is about the PDF content, answer using that information
2. If the question goes beyond the PDF, use your general knowledge to provide a helpful answer
3. Always be conversational, natural, and engaging like ChatGPT/Gemini
4. Provide detailed, well-explained answers with examples
5. If you're not sure, say so honestly
6. Be educational and practical

Respond in JSON format:
{{
    "answer": "Your natural, conversational response here. Be detailed, helpful, and engaging. Use examples and explanations. If the question is beyond the PDF, use your general AI knowledge to provide a comprehensive answer.",
    "summary": "Brief summary",
    "key_points": ["Point 1", "Point 2", "Point 3", "Point 4"],
    "learning_outcome": "What the user learns",
    "possible_questions": ["Related Q1?", "Related Q2?", "Related Q3?"],
    "additional_resources": "Further learning suggestions",
    "real_world_example": "Practical example",
    "source": "PDF" or "General Knowledge" or "Both"
}}

Be natural and conversational like Gemini AI!"""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0].strip()
            elif '```' in response_text:
                response_text = response_text.split('```')[1].split('```')[0].strip()
            
            result = json.loads(response_text)
            
            self.conversation_history.append({
                'question': question,
                'answer': result.get('answer', '')
            })
            
            return {
                'answer': result.get('answer', 'I apologize, I could not generate a response.'),
                'summary': result.get('summary', ''),
                'key_points': result.get('key_points', [])[:4],
                'learning_outcome': result.get('learning_outcome', ''),
                'possible_questions': result.get('possible_questions', [])[:3],
                'additional_resources': result.get('additional_resources', ''),
                'real_world_example': result.get('real_world_example', ''),
                'source': result.get('source', 'AI')
            }
            
        except json.JSONDecodeError:
            return {
                'answer': response_text if 'response_text' in locals() else "Error processing response",
                'summary': "",
                'key_points': [],
                'learning_outcome': "",
                'possible_questions': [],
                'additional_resources': "",
                'real_world_example': "",
                'source': 'AI'
            }
            
        except Exception as e:
            print(f"Error: {e}")
            return {
                'answer': f"I encountered an error: {str(e)}. Please try again.",
                'summary': "",
                'key_points': [],
                'learning_outcome': "",
                'possible_questions': [],
                'additional_resources': "",
                'real_world_example': "",
                'source': 'Error'
            }
    
    def generate_all_possible_questions(self):
        """Generate questions"""
        prompt = f"""Based on this content, generate 10 interesting questions:

{self.full_text[:10000]}

Return JSON: {{"questions": ["Q1?", "Q2?", ...]}}"""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0].strip()
            elif '```' in response_text:
                response_text = response_text.split('```')[1].split('```')[0].strip()
            
            result = json.loads(response_text)
            return result.get('questions', [])
        except:
            return [
                "What is this about?",
                "Can you explain the main concepts?",
                "How does this work?",
                "What are practical applications?",
                "Can you give examples?"
            ]
