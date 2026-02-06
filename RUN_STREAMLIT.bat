@echo off
echo Installing Streamlit dependencies...
pip install -r requirements_streamlit.txt

echo.
echo Starting AI Learning Companion (Streamlit)...
echo.
echo Open your browser to: http://localhost:8501
echo.
streamlit run streamlit_app.py
pause
