import { WebSocketServer } from 'ws';
import http from 'http';
import { createRequire } from 'module';

// В ESM нельзя require(), но createRequire это обходит
const require = createRequire(import.meta.url);

// y-websocket@2.1.0 поставляет setupWSConnection в bin/utils.cjs
// package.json exports: "./bin/utils": "./bin/utils.cjs"
const { setupWSConnection } = require('y-websocket/bin/utils');

const PORT = process.env.PORT || 1234;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

wss.on('connection', (conn, req) => {
  const url = req.url || '/';
  const roomName = url.slice(1).split('?')[0] || 'default';
  console.log(`[ws] client joined room: ${roomName}`);
  setupWSConnection(conn, req, { gc: true });
});

server.listen(PORT, () => {
  console.log(`[ws] CollabPad server running on ws://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  wss.close();
  server.close(() => process.exit(0));
});