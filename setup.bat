@echo off
REM Windows one-click setup. Double-click this file or run from cmd.
REM Copies the live HTML demo into public\index.html.

setlocal
set "SCRIPT_DIR=%~dp0"
set "SRC=%SCRIPT_DIR%..\Southampton_Cruise_Wayfinding_v1.html"
set "DST_DIR=%SCRIPT_DIR%public"
set "DST=%DST_DIR%\index.html"

if not exist "%SRC%" (
  echo.
  echo   ERROR: Cannot find the source HTML.
  echo   Expected at: %SRC%
  echo.
  pause
  exit /b 1
)

if not exist "%DST_DIR%" mkdir "%DST_DIR%"

copy /Y "%SRC%" "%DST%" >nul
if errorlevel 1 (
  echo.
  echo   ERROR: Copy failed.
  echo.
  pause
  exit /b 1
)

echo.
echo   OK: Copied to public\index.html
echo.
echo   Next steps:
echo     git init
echo     git add .
echo     git commit -m "Initial commit"
echo     git push to GitHub, then connect on https://railway.app
echo.
pause
endlocal
