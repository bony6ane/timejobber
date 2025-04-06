document.addEventListener("DOMContentLoaded", () => {
    const deckContainer = document.getElementById("deckContainer");
  
    const deck = JSON.parse(localStorage.getItem("timeJobberDeck")) || [];
  
    if (deck.length === 0) {
      deckContainer.innerHTML = "<p class='text-center text-gray-600'>No cards saved yet!</p>";
      return;
    }
  
    deck.forEach((card) => {
      const cardHTML = `
        <div class="bg-white rounded-xl shadow-md p-4 border border-gray-300">
          <h2 class="text-xl font-bold text-purple-700 mb-1">${card.title}</h2>
          <p class="text-sm text-gray-500 mb-2"><strong>Job:</strong> ${card.job}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Rarity:</strong> ${card.rarity}</p>
          <div class="space-y-1">
            ${Object.entries(card.stats)
              .map(([key, value]) => `<p class="text-sm">${key}: <strong>${value}</strong></p>`)
              .join("")}
          </div>
        </div>
      `;
      deckContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
  });
  