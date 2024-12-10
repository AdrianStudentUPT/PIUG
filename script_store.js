document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("searchInput");
    const storeGrid = document.getElementById("STORE_GRID");
    const searchFailedMessage = document.getElementById("STORE_SEARCH_FAILED");
    let jsonData = [];

    // Fetch JSON data from the titles.JSON file
    fetch('store.JSON')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            displayGames(); // Populate the grid after loading data
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // Function to handle vote button clicks
    function setupVoteButtons(card) {
        const upVoteButton = card.querySelector('button img[alt="Upvote"]').parentElement;
        const downVoteButton = card.querySelector('button img[alt="Downvote"]').parentElement;

        // Handle Upvote Click
        upVoteButton.addEventListener("click", () => {
            if (upVoteButton.classList.contains("active")) {
                upVoteButton.classList.remove("active");
            } else {
                upVoteButton.classList.add("active");
                downVoteButton.classList.remove("active"); // Remove active from Downvote
            }
        });

        // Handle Downvote Click
        downVoteButton.addEventListener("click", () => {
            if (downVoteButton.classList.contains("active")) {
                downVoteButton.classList.remove("active");
            } else {
                downVoteButton.classList.add("active");
                upVoteButton.classList.remove("active"); // Remove active from Upvote
            }
        });
    }

    // Function to create game cards
    function createGameCard(game) {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img class="title-banner" src="store/title_ID_${game.title_ID}.jpg" alt="${game.title_name} Banner" />
            <div class="title-details">
                <div>
                    <p class="game-title">${game.title_name}</p>
                    <p class="game-price">$${game.title_price.toFixed(2)}</p>
                </div>
                <div class="banner-view"></div>
                <div>
                    <p class="game-genres">${game.title_genres.join(", ")}</p>
                </div>
                <div class="game-card-buttons">
                    <button><img src="media/up-vote.png" alt="Upvote"></button>
                    <button>Buy</button>
                    <button><img src="media/down-vote.png" alt="Downvote"></button>
                </div>
            </div>
        `;

        setupVoteButtons(card); // Attach vote button functionality

        return card;
    }

    // Function to filter and display games
    // Function to filter and display games
    function displayGames() {
        const filterText = searchInput.value.toLowerCase();
        storeGrid.innerHTML = ""; // Clear previous results

        const filteredGames = jsonData.filter(game =>
            game.title_name.toLowerCase().includes(filterText) ||
            game.title_genres.some(genre => genre.toLowerCase().includes(filterText))
        );

        // Check if any games match the filter
        if (filteredGames.length > 0) {
            searchFailedMessage.style.display = "none"; // Show the grid
            filteredGames.forEach(game => {
                const gameCard = createGameCard(game);
                storeGrid.appendChild(gameCard);
            });
        } else {
            searchFailedMessage.style.display = "block"; // Hide the grid if no games match
        }
    }

    // Add event listener for search input
    searchInput.addEventListener("input", displayGames);
});
