@echo off
cd /d "%~dp0"
title Tao Duong Ham Internet Cho Lop 5 AI Tutor (Serveo)
echo ======================================================================
echo    DANG KET NOI DUONG HAM INTERNET CHO UNG DUNG LOP 5 AI TUTOR...
echo ======================================================================
echo.
echo [1] Dam bao ung dung Streamlit dang chay tai cong 8501...
echo [2] Dang tao duong link HTTPS cong khai qua Serveo SSH Tunnel...
echo.
echo ======================================================================
echo    DUONG LINK TRUY CAP TRUC TIEP TREN DIEN THOAI / IPAD SE HIEN BEN DUOI:
echo ======================================================================
echo.
ssh -o StrictHostKeyChecking=no -R 80:localhost:8501 serveo.net
pause
