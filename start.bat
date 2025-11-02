@echo off
echo ====================================
echo    AKADEMIA ANALIZY BIZNESOWEJ
echo         Frontend Launcher
echo ====================================
echo.

echo [1/3] Sprawdzanie backendu...
curl -s http://localhost:3000/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] UWAGA: Backend nie odpowiada na http://localhost:3000
    echo [!] Upewnij sie, ze backend jest uruchomiony!
    echo.
)

echo [2/3] Instalowanie zaleznosci...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [BLAD] Nie udalo sie zainstalowac zaleznosci!
    echo Sprawdz czy Node.js jest zainstalowany: node --version
    echo.
    pause
    exit /b 1
)

echo [3/3] Uruchamianie serwera...
echo.
echo ====================================
echo   Frontend bedzie dostepny na:
echo   http://localhost:8080
echo ====================================
echo.
echo [*] NIE ZAMYKAJ tego okna!
echo [*] Nacisnij Ctrl+C aby zatrzymac serwer
echo.

call npm start

echo.
echo Serwer zostal zatrzymany.
pause
