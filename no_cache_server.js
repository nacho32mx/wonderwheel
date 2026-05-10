const http = require("http");
const fs = require("fs");
const path = require("path");
const port = Number(process.env.SKILL_WHEEL_PORT || 8000);
const root = __dirname;
const startPage = `http://localhost:${port}/dashboard.html`;
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".txt": "text/plain; charset=utf-8"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, startPage);
  const requested = decodeURIComponent(url.pathname === "/" ? "/dashboard.html" : url.pathname);
  const filePath = path.resolve(root, `.${requested}`);
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, types[path.extname(filePath).toLowerCase()] || "application/octet-stream");
  });
});

server.listen(port, "localhost", () => {
  console.log(`Wonder Wheel no-cache dev server running at ${startPage}`);
  console.log("Press Ctrl+C in this window to stop the server.");
  console.log(`Open ${startPage} in your browser.`);
});
