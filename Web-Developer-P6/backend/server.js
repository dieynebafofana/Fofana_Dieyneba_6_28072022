const dotenv = require("dotenv").config();

const http = require("http");
const app = require("./app");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.set("port", process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);
