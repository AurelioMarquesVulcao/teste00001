const http = require("http");
const app = require("./src/app");

const port = process.env.Port || 8000;

const server = http.createServer(app);
server.listen(port);
console.log('server ok')

