const bingoContainer = document.getElementById("bingo-container");
const socket = io(); // Connect to the Socket.IO server

// Render the bingo grid
const bingoCard = [
  "This is the first sentence.",
  "Here's the second sentence.",
  "The third one is here.",
  "Fourth sentence goes here.",
  "Fifth sentence completes the first row.",
  "Start of the second row with this one.",
  "Here's another for row two.",
  "Eighth sentence for testing.",
  "The ninth tile is placed here.",
  "Row two ends with this one.",
  "Row three starts with something simple.",
  "Twelfth sentence goes in the middle row.",
  "Lucky number thirteen here.",
  "The fourteenth sentence is here.",
  "Halfway through with the fifteenth sentence.",
  "Sixteenth starts the fourth row.",
  "Seventeenth goes here.",
  "Eighteenth tile for more testing.",
  "Nineteenth goes in row four.",
  "Row four ends with the twentieth tile.",
  "The final row starts with tile twenty-one.",
  "Twenty-two goes here.",
  "Twenty-three for more content.",
  "Penultimate tile is here.",
  "Finally, the last tile completes the grid.",
];

// Function to render the grid
const renderGrid = (state) => {
  bingoContainer.innerHTML = ""; // Clear existing tiles
  bingoCard.forEach((sentence, index) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sentence;
    if (state[index]) {
      tile.classList.add("marked"); // Mark tiles based on state
    }
    tile.onclick = () => {
      socket.emit("toggleTile", index); // Notify server of the change
    };
    bingoContainer.appendChild(tile);
  });
};

// Listen for bingo state updates from the server
socket.on("updateBingoState", (state) => {
  renderGrid(state);
});
