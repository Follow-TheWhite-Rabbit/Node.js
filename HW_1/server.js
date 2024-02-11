const http = require('http');
const url = require('url');

let requestCount = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    requestCount += 1;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Request handled successfully', requestCount }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = process.argv.slice(2).find((arg) => arg.startsWith('--port=')) || '--port=3000';
const specifiedPort = parseInt(port.split('=')[1], 10);

server.listen(specifiedPort, () => {
  console.log(`Server is running on port ${specifiedPort}`);
});
