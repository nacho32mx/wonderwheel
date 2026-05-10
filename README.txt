Wonder Wheel Custom Spinner Tool
Version: 1.3

Run on Windows:
1. Double-click "Run Skill Wheel.bat"
2. The no-cache local server opens the dashboard at http://localhost:8000/dashboard.html

Changes in this build:
- Expanded wheel creation and editing from 1-4 rings to 1-6 rings.
- Added Ring 5 and Ring 6 setup steps, editor cards, backgrounds, labels, dragging, scroll spinning, selection display, latest spin display, and completed-combination support.
- Increased each ring's slice limit from 10 to 12.
- Simplified the wizard ring-count wording and renamed the wizard progress labels to Ring 1 through Ring 6.
- Added dashboard background image customization.
- Added dashboard wheel editing through the creation wizard.
- Moved the wheel Edit button next to Dashboard, made the completed log collapsible, and added an optional Prevent repeat selections checkbox.
- Renamed the selected result labels to Ring 1 through Ring 6 and added an Allow animations setting in the wizard and wheel editor.
- Updated the visible build badges and cache-busting URLs to Wonder Wheel v1.3.
- Optimized unused-combination skipping so large six-ring wheels do not build every possible combination in memory.
- Keeps the no-cache Python web server and BAT launcher, with a Node fallback server for machines without Python on PATH.

If you still see quota errors from older builds, clear site data for localhost in your browser once, then use this build going forward.
