// Zero-dependency static file server for the Southampton Cruise Wayfinding demo.
// Serves everything in ./public. Falls back to index.html for unknown paths
// so the ?tag= URL pattern keeps working.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function send(res, status, contentType, body, extraHeaders) {
  res.statusCode = status;
  res.setHeader('Content-Type', contentType);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=300');
  if (extraHeaders) Object.entries(extraHeaders).forEach(([k, v]) => res.setHeader(k, v));
  res.end(body);
}

function serveIndex(res) {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  fs.readFile(indexPath, (err, data) => {
    if (err) return send(res, 404, 'text/plain; charset=utf-8', 'Not Found. Did you run `node prepare.js`?');
    return send(res, 200, MIME['.html'], data, { 'Cache-Control': 'no-cache' });
  });
}

const server = http.createServer((req, res) => {
  // Strip query string
  let urlPath = (req.url || '/').split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  try { urlPath = decodeURIComponent(urlPath); } catch (e) {}
  const filePath = path.normalize(path.join(PUBLIC_DIR, urlPath));
  // Guard against directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    return send(res, 403, 'text/plain; charset=utf-8', 'Forbidden');
  }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return serveIndex(res);
    fs.readFile(filePath, (err2, data) => {
      if (err2) return send(res, 500, 'text/plain; charset=utf-8', 'Server error');
      const ext = path.extname(filePath).toLowerCase();
      return send(res, 200, MIME[ext] || 'application/octet-stream', data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Southampton Cruise Wayfinding listening on port ${PORT}`);
});
