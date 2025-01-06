const bingoContainer = document.getElementById("bingo-container");
const socket = io(); // Connect to the Socket.IO server

// Render the bingo grid
const bingoCard = [
  "Climb 3 unique spiritsprings.",
  "Kill 2 (adult) crabs.",
  "Kill 3 Pests.",
  "Buy something from 3 different overworld NPC's.",
  "Get 3 Spirit Ashes.",
  "Kill a soldier in one attack.",
  "Explode a Land Squirt.",
  "Clear Fort Haight.",
  "Kill a mounted enemy, but not his horse.",
  "Equip 4 pieces of armour at once.",
  "Upgrade your flasks 3 times (Seeds or Tears).",
  "Kill 5 enemies without taking damage.",
  "Kill 3 giants.",
  "Kill two bears.",
  "Kill two claymen.",
  "Light two Siofra River Altars.",
  "Kill a hostile enemy entirely with throwing weapons.",
  "Shoot 5 birds with a bow.",
  "Buy a sorcery.",
  "Clear the camp beneath the Lance.",
  "Reach Level 5.",
  "Kill a Land Octopus.",
  "Give Boc his sewing needle.",
  "Complete a Hero's Grave.",
  "Complete a dungeon outside Limgrave.",
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
