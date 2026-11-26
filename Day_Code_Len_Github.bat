@echo off
cd /d "%~dp0"
title Day Code Len GitHub - linhpham5089-app/lop5-vui-hoc
echo ======================================================================
echo    DANG TIEN HANH DAY CODE LEN GITHUB REPOSITORY:
echo    https://github.com/linhpham5089-app/lop5-vui-hoc.git
echo ======================================================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo ======================================================================
if %ERRORLEVEL% EQU 0 (
    echo [THANH CONG] Toan bo ma nguon da duoc day len GitHub thanh cong!
) else (
    echo [LUU Y] Neu co cua so GitHub Sign-in hien ra, hay bam dang nhap de xac thuc.
)
echo ======================================================================
pause
