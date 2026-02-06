import streamlit as st
import os
from chatbot_logic import PDFProcessor, Chatbot
from dotenv import load_dotenv

load_dotenv()

# Page config
st.set_page_config(
    page_title="AI Learning Companion",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .stApp {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }
    .chat-message {
        padding: 1.5rem;
        border-radius: 15px;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .user-message {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-left: 20%;
    }
    .bot-message {
        background: white;
        color: #1a1a2e;
        margin-right: 20%;
        border-left: 5px solid #667eea;
    }
    .stButton>button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 50px;
        font-weight: 600;
    }
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'chatbot' not in st.session_state:
    st.session_state.chatbot = None
if 'messages' not in st.session_state:
    st.session_state.messages = []
if 'pdf_processed' not in st.session_state:
    st.session_state.pdf_processed = False

# Sidebar
with st.sidebar:
    st.title("🎓 AI Learning Companion")
    st.markdown("---")
    
    # PDF Upload
    st.header("📄 Upload PDF")
    uploaded_file = st.file_uploader("Choose your academic PDF", type=['pdf'])
    
    if uploaded_file and not st.session_state.pdf_processed:
        with st.spinner("Processing PDF..."):
            # Save uploaded file
            os.makedirs("uploads", exist_ok=True)
            file_path = os.path.join("uploads", uploaded_file.name)
            with open(file_path, "wb") as f:
                f.write(uploaded_file.getbuffer())
            
            # Process PDF
            try:
                processor = PDFProcessor(file_path)
                text = processor.extract_text()
                chunks = processor.create_chunks(text)
                
                # Create chatbot
                st.session_state.chatbot = Chatbot(chunks, full_text=text)
                st.session_state.pdf_processed = True
                st.success("✅ PDF processed successfully!")
                st.balloons()
            except Exception as e:
                st.error(f"Error processing PDF: {e}")
    
    if st.session_state.pdf_processed:
        st.success("✅ PDF Ready")
        if st.button("🔄 Upload New PDF"):
            st.session_state.chatbot = None
            st.session_state.messages = []
            st.session_state.pdf_processed = False
            st.rerun()
    
    st.markdown("---")
    st.markdown("### 💡 How to use:")
    st.markdown("""
    1. Upload your PDF document
    2. Ask any question about the content
    3. Get AI-powered answers
    4. Explore key points and examples
    """)
    
    st.markdown("---")
    st.markdown("### 🌟 Features:")
    st.markdown("""
    - 🤖 ChatGPT-like responses
    - 📚 PDF content analysis
    - 💬 Natural conversations
    - 🎯 Learning outcomes
    - 🌍 Real-world examples
    """)

# Main content
st.title("💬 AI Learning Assistant")
st.markdown("Ask me anything about your uploaded PDF!")

# Display chat messages
for message in st.session_state.messages:
    if message["role"] == "user":
        st.markdown(f"""
        <div class="chat-message user-message">
            <strong>You:</strong><br>{message["content"]}
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown(f"""
        <div class="chat-message bot-message">
            <strong>🤖 AI Assistant:</strong><br>{message["content"]}
        </div>
        """, unsafe_allow_html=True)
        
        # Show additional info if available
        if "metadata" in message:
            with st.expander("📊 See detailed insights"):
                meta = message["metadata"]
                
                if meta.get("summary"):
                    st.markdown("**📝 Summary:**")
                    st.info(meta["summary"])
                
                if meta.get("key_points"):
                    st.markdown("**🔑 Key Points:**")
                    for point in meta["key_points"]:
                        st.markdown(f"- {point}")
                
                if meta.get("learning_outcome"):
                    st.markdown("**🎯 Learning Outcome:**")
                    st.success(meta["learning_outcome"])
                
                if meta.get("real_world_example"):
                    st.markdown("**🌍 Real-World Example:**")
                    st.warning(meta["real_world_example"])
                
                if meta.get("possible_questions"):
                    st.markdown("**❓ Related Questions:**")
                    for q in meta["possible_questions"]:
                        if st.button(q, key=f"q_{hash(q)}"):
                            st.session_state.next_question = q
                            st.rerun()

# Chat input
if st.session_state.pdf_processed:
    # Check if there's a next question from button click
    if 'next_question' in st.session_state:
        user_input = st.session_state.next_question
        del st.session_state.next_question
    else:
        user_input = st.chat_input("Ask your question here...")
    
    if user_input:
        # Add user message
        st.session_state.messages.append({"role": "user", "content": user_input})
        
        # Get AI response
        with st.spinner("🤔 Thinking..."):
            response = st.session_state.chatbot.get_response(user_input)
            
            # Add bot message
            st.session_state.messages.append({
                "role": "assistant",
                "content": response["answer"],
                "metadata": {
                    "summary": response.get("summary", ""),
                    "key_points": response.get("key_points", []),
                    "learning_outcome": response.get("learning_outcome", ""),
                    "real_world_example": response.get("real_world_example", ""),
                    "possible_questions": response.get("possible_questions", [])
                }
            })
        
        st.rerun()
else:
    st.info("👈 Please upload a PDF from the sidebar to start chatting!")
    
    # Show example questions
    st.markdown("### 💡 Example questions you can ask:")
    col1, col2 = st.columns(2)
    with col1:
        st.markdown("""
        - What is this document about?
        - Explain the main concepts
        - Give me examples
        - How does this work?
        """)
    with col2:
        st.markdown("""
        - What are the key points?
        - How can I apply this?
        - Why is this important?
        - Can you simplify this?
        """)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666;'>
    <p>🎓 AI Learning Companion | Powered by Google Gemini AI</p>
    <p>Built for academic excellence</p>
</div>
""", unsafe_allow_html=True)
