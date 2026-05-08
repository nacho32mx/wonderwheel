Wonder Wheel Custom Spinner Tool
Version: 1.2

Run on Windows:
1. Double-click "Run Skill Wheel.bat"
2. The no-cache local server opens the dashboard at http://localhost:8000/dashboard.html

Changes in this build:
- Replaced the visible bow-string charge with a natural backward wheel wind-up that rotates opposite the planned spin direction.
- Updated the visible build badge and cache-busting URLs to Wonder Wheel v1.2.
- Added a visible Wonder Wheel v1.1 badge and v=1.1 cache-busting URLs so the active build is easy to confirm.
- Improved randomness with per-ring spin offsets, varied speeds, varied directions, and randomized unused-combination skipping.
- Added a charge tension animation while holding the center spin button, giving the wheel a bow-string pullback feel.
- Expanded the bottom-left spin results panel for better legibility.
- Ring prompts now appear before selected slice values, such as "Tell a story Ian".
- Latest completed spin results now appear on the left with each resulting prompt and raw spin value.
- Shortened the max-spin tail slightly so fully charged spins resolve faster.
- Added a theme-colored confetti finish animation that launches upward, floats down, and fades out.
- Added per-ring prompt text. Selected results now combine the chosen slice with that ring's prompt in the left selected table.
- Added matching spin animation overlays to each wheel layer, strongest near the center and softer toward the outer edge.
- Ring count can now be set anywhere from 1 to 4 rings during setup or editing.
- Active rings are now spaced evenly, and the center wheel button is smaller to give labels more room.
- Added an optional fourth customizable Core Ring during wheel creation and editing.
- Added Core Ring backgrounds, labels, dragging, scroll spinning, selection flashing, and completed-combination support.
- Dashboard wheel cards now summarize the active ring count, including Core Ring when enabled.
- Changed the wheel move tool into a traditional cross icon.
- Softened the theme spiral and made it fade out when a spin stops.
- Added edge sparks that fly from the wheel while spinning.
- Added a completed-combination log. Finished combinations are spent and skipped on future spins when unused combinations remain.
- Added theme-specific spiral animations that circle the wheel while it spins.
- Selected wheel slices now flash when a spin finishes.
- Wheel rings can now be clicked and dragged to spin them manually.
- The mouse scroll wheel now spins the wheel rings.
- Max spin charge is now reached in 1.5 seconds.
- Renamed the dashboard experience to Wonder Wheel.
- Increased the maximum wheel size.
- Moved the wheel move handle to the bottom-left of the wheel.
- Dashboard wheel icons now use each wheel's center image when available.
- Spin particles now spread across the full page.
- Selected results now flash for 2 seconds after a spin finishes.
- Moved the visible resize tool into the wheel as a bottom-right drag handle.
- Added center wheel background image controls in both the setup wizard and editor.
- Fixed new wheel creation when the setup wizard has hidden required fields.
- Updated the side resize slider styling to avoid the browser's deprecated slider-vertical warning.
- Background images now save in IndexedDB instead of localStorage to avoid quota errors.
- Older data-image backgrounds are automatically stripped from localStorage and migrated when possible.
- Added wheel resizing in the wheel editor and creation wizard.
- Added page background image support in the wheel editor and creation wizard.
- Keeps the no-cache Python web server and BAT launcher.

If you still see quota errors from older builds, clear site data for localhost in your browser once, then use this build going forward.
