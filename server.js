const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Пользователь подключен");

  socket.on("chatMessage", (message) => {
    console.log("Получено сообщение: ", message);
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключен");
  });
});

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
