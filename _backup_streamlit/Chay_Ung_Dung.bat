@echo off
cd /d "%~dp0"
echo [INFO] Starting Lop 5 AI Tutor Web Application...
"C:\Users\MAI HANH\AppData\Local\Programs\Python\Python312\python.exe" -m streamlit run app.py --server.port 8501
pause
