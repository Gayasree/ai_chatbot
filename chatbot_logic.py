# Ultimate AI Chatbot - Gemini-like (PDF + General Knowledge)

import PyPDF2
import os
import re
import json
import google.generativeai as genai
from pathlib import Path
import streamlit as st


class PDFProcessor:
    """Process PDFs and folders"""

    def __init__(self, path):
        self.path = path

    def extract_text(self):
        if os.path.isfile(self.path):
            return self._extract_from_file(self.path)
        elif os.path.isdir(self.path):
            return self._extract_from_folder(self.path)
        else:
            raise Exception("Invalid path")

    def _extract_from_file(self, file_path):
        text = ""
        with open(file_path, "rb") as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                if page.extract_text():
                    text += page.extract_text() + "\n"
        return text

    def _extract_from_folder(self, folder_path):
        all_text = ""
        for pdf_file in Path(folder_path).glob("*.pdf"):
            all_text += f"\n\n=== {pdf_file.name} ===\n\n"
            all_text += self._extract_from_file(str(pdf_file))
        return all_text

    def create_chunks(self, text, chunk_size=3000):
        text = re.sub(r"\s+", " ", text).strip()
        sentences = re.split(r"(?<=[.!?])\s+", text)

        chunks, current = [], ""
        for s in sentences:
            if len(current) + len(s) < chunk_size:
                current += s + " "
            else:
                chunks.append(current.strip())
                current = s + " "
        if current:
            chunks.append(current.strip())

        return chunks


class Chatbot:
    """Gemini AI Chatbot"""

    def __init__(self, chunks, full_text=""):
        self.chunks = chunks
        self.full_text = full_text or " ".join(chunks)
        self.conversation_history = []

        # ✅ STREAMLIT-SAFE API KEY HANDLING
        try:
            api_key = st.secrets["GEMINI_API_KEY"]
        except Exception:
            api_key = st.secrets.get("GEMINI_API_KEY")

        if not api_key:
            raise Exception("❌ Gemini API key not found. Add it to Streamlit Secrets.")

        genai.configure(api_key=api_key)

        # Stable & supported model
        self.model = genai.GenerativeModel("gemini-2.5-flash")

    def get_response(self, question):
        prompt = f"""
You are Gemini AI, a helpful and conversational assistant.

PDF CONTENT:
{self.full_text[:20000]}

USER QUESTION:
{question}

Respond in JSON:
{{
  "answer": "...",
  "summary": "...",
  "key_points": ["...", "..."],
  "learning_outcome": "...",
  "source": "PDF / General Knowledge / Both"
}}
"""

        try:
            response = self.model.generate_content(prompt)
            text = response.text.strip()

            if "```json" in text:
                text = text.split("```json")[1].split("```")[0]

            result = json.loads(text)

            self.conversation_history.append({
                "question": question,
                "answer": result.get("answer", "")
            })

            return result

        except Exception as e:
            return {
                "answer": f"Error generating response: {e}",
                "summary": "",
                "key_points": [],
                "learning_outcome": "",
                "source": "Error"
            }
