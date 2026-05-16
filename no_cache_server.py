#!/usr/bin/env python3
"""No-cache local dev server for Skill Wheel.

Run through Run Skill Wheel.bat on Windows, or manually:
    python no_cache_server.py
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import functools
import webbrowser
import threading
import os

PORT = int(os.environ.get("SKILL_WHEEL_PORT", "8000"))
ROOT = Path(__file__).resolve().parent
START_PAGE = f"http://localhost:{PORT}/dashboard.html"

class NoCacheHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".css": "text/css",
        ".html": "text/html; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):
        print("[%s] %s" % (self.log_date_time_string(), format % args))

if __name__ == "__main__":
    os.chdir(ROOT)
    handler = functools.partial(NoCacheHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("localhost", PORT), handler)
    print(f"Skill Wheel no-cache dev server running at {START_PAGE}")
    print("Press Ctrl+C in this window to stop the server.")
    threading.Timer(0.75, lambda: webbrowser.open(START_PAGE)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Skill Wheel server...")
        server.server_close()
