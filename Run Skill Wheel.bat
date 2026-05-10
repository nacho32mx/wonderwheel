@echo off
setlocal
cd /d "%~dp0"
set SKILL_WHEEL_PORT=8000
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 no_cache_server.py
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    python no_cache_server.py
  ) else (
    node no_cache_server.js
  )
)
pause
