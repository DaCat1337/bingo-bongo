const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let bingoState = Array(25).fill(false); // Initial state: all tiles unmarked

// Serve static files (your HTML, CSS, JS files)
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the current bingo state to the new user
  socket.emit("updateBingoState", bingoState);

  // Listen for tile toggle events
  socket.on("toggleTile", (index) => {
    bingoState[index] = !bingoState[index]; // Toggle the tile state

    // Broadcast the updated state to all users
    io.emit("updateBingoState", bingoState);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
