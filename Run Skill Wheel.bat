@echo off
setlocal
cd /d "%~dp0"
set SKILL_WHEEL_PORT=8000
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 no_cache_server.py
) else (
  python no_cache_server.py
)
pause
