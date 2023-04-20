const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");
const swaggerDocs = require("../swagger");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

require("dotenv").config();
require("./socket.io")(io);

app.set("io", io);

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
