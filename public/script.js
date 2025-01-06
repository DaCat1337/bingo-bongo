const bingoContainer = document.getElementById("bingo-container");
const socket = io(); // Connect to the Socket.IO server

// Store the selected color (green or blue)
let selectedColor = "green";

// Listen for color change (radio buttons)
document.querySelectorAll('input[name="color"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    selectedColor = e.target.value; // Update selected color
  });
});

// Bingo card content
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

    const tileState = state[index];

    // Apply the correct class based on the tile's state
    if (tileState === "green") {
      tile.classList.add("green");
    } else if (tileState === "blue") {
      tile.classList.add("blue");
    } else if (tileState === "both") {
      tile.classList.add("half-half");
    }

    tile.onclick = () => {
      // Toggle the color based on the selected color
      let newState = "";
      if (tileState === "green") {
        newState = selectedColor === "blue" ? "both" : "green";
      } else if (tileState === "blue") {
        newState = selectedColor === "green" ? "both" : "blue";
      } else {
        newState = selectedColor;
      }

      socket.emit("toggleTile", { index, newState }); // Notify server of the change
    };

    bingoContainer.appendChild(tile);
  });
};

// Listen for bingo state updates from the server
socket.on("updateBingoState", (state) => {
  renderGrid(state);
});
