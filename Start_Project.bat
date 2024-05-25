@echo off

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo Node.js is not installed. Please install Node.js to run this script.
  echo.
  REM Pause to keep the command prompt open
  pause
  exit /b 1
)
echo Node.js is installed.
cls

REM Check if MySQL is installed
where MySQL -u root -p >nul 2>nul
if %errorlevel% neq 0 (
  echo MySQL is not installed. Please install MySQL to run this script.
  echo.
  REM Pause to keep the command prompt open
  pause
  exit /b 1
)
echo MySQL is installed.
cls

REM Starting Ubuntu
call start cmd /k "ubuntu"

REM Pause to keep the command prompt open

echo Run StartBackend command in the new ubuntu terminal to start the backend apis.
echo.

pause

REM Start frontend in a new terminal
call start cmd /k "cd Frontend && npm start"

REM Start backend in a new terminal
call start cmd /k "cd Backend && npm start"

echo Web app is running.

REM Close the current terminal
exit
