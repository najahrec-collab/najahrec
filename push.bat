@echo off
chcp 65001 >nul
echo ==============================================
echo   مكتب النجاح للاستقدام - أداة رفع التحديثات
echo ==============================================
echo.

set "GIT_CMD=git"
where git >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
    ) else if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd\git.exe" (
        set "GIT_CMD=C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd\git.exe"
    ) else (
        echo [خطأ] برنامج Git غير مثبت أو غير موجود في المسار الافتراضي!
        pause
        exit /b 1
    )
)

echo 1. جاري فحص الملفات المعدلة...
"%GIT_CMD%" status --short
echo.

set /p commit_msg="أدخل وصف التعديل (أو اضغط Enter لوصف تلقائي): "
if "%commit_msg%"=="" (
    set commit_msg=Update site files %date% %time%
)

echo.
echo 2. جاري إضافة وحفظ التعديلات (Git Add & Commit)...
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "%commit_msg%"

echo.
echo 3. جاري الرفع إلى GitHub (Git Push)...
"%GIT_CMD%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ==============================================
    echo   [تم بنجاح] تم رفع جميع التحديثات إلى GitHub!
    echo ==============================================
) else (
    echo.
    echo [تنبيه] حدث خطأ أثناء الرفع، يرجى التأكد من اتصال الإنترنت والصلاحيات.
)

echo.
pause
