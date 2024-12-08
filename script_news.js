document.addEventListener("DOMContentLoaded", () => {
    let minWidthForNewsCard = window.minWidthForNewsCard || 500;
    let numberOfNewsCards = Math.floor(window.innerWidth / minWidthForNewsCard); // Number of images visible at a time
    let numberOfNews = window.numberOfNews || numberOfNewsCards;
    let currentDisplayIndex = 0;
    const imageFolder = "./news"; // Path to the "news" folder
    const intervalDuration = (window.newsAutoDelay || 10) * 1000; // 10 default seconds

    let autoSlideInterval;
    let imagePaths = [];
    const imageContainer = document.querySelector("#NEWS .image-container");
    const markersContainer = document.querySelector("#NEWS .markers");
    const leftArrow = document.querySelector("#left-arrow");
    const rightArrow = document.querySelector("#right-arrow");

    const socialMedia = [
        { name: "Facebook", src: "media/facebook-icon.png", link: "https://www.facebook.com" },
        { name: "Instagram", src: "media/instagram-icon.png", link: "https://www.instagram.com" },
        { name: "YouTube", src: "media/youtube-icon.png", link: "https://www.youtube.com" },
        { name: "TikTok", src: "media/tiktok-icon.png", link: "https://www.tiktok.com" },
    ];

    // Fetch the number of news dynamically
    function loadImages() {
        // Check for `numberOfNews` in the global scope

        // Populate `imagePaths` array dynamically
        imagePaths = [];
        for (let i = 1; i <= numberOfNews; i++) {
            imagePaths.push(`news_${i}.jpg`);
        }

        // Preload images and initialize the slider
        preloadImages();
        createMarkers();
        updateImages();
    }

    // Preload all images
    function preloadImages() {
        imagePaths.forEach((imagePath) => {
            const img = new Image();
            img.src = `${imageFolder}/${imagePath}`;
        });
    }

    // Update the images displayed in the slider
    function updateImages() {
        const startIndex = currentDisplayIndex;
        const endIndex = startIndex + numberOfNewsCards;

        // Clear the current images
        imageContainer.innerHTML = "";

        // Add images to the container
        for (let i = startIndex; i < endIndex; i++) {
            const elementBody = document.createElement("div");
            elementBody.classList.add("news_card");
            const imgIndex = i % imagePaths.length; // Wrap around if index exceeds length
            const imgElement = document.createElement("img");
            imgElement.classList.add("news_banner");
            imgElement.src = `${imageFolder}/${imagePaths[imgIndex]}`;
            imgElement.alt = `News Banner ${i + 1}`;
            imageContainer.appendChild(imgElement);

            const widgetContainer = document.createElement("div");
            widgetContainer.classList.add("social-widget");
            // Add social media buttons
            socialMedia.forEach((platform) => {
                const iconButton = document.createElement("a");
                iconButton.href = platform.link;
                iconButton.target = "_blank"; // Open links in a new tab
                
                const icon = document.createElement("img");
                icon.src = platform.src;
                icon.alt = `${platform.name} Icon`;

                iconButton.innerHTML = icon.outerHTML;
                widgetContainer.appendChild(iconButton);
            });
            //socialMediaContainer.appendChild(widgetContainer);
            elementBody.appendChild(imgElement);
            elementBody.appendChild(widgetContainer);
            imageContainer.appendChild(elementBody);
        }

        updateMarkers();
    }

    // Create the markers for the slider
    function createMarkers() {
        markersContainer.innerHTML = ""; // Clear existing markers

        for (let i = 0; i < imagePaths.length; i++) {
            const marker = document.createElement("span");
            markersContainer.appendChild(marker);
        }

        updateMarkers();
    }

    // Update the markers to reflect the current displayed images
    function updateMarkers() {
        const markers = document.querySelectorAll("#NEWS .markers span");

        // Reset all markers
        markers.forEach((marker) => marker.classList.remove("active"));

        // Activate markers for currently displayed images
        for (let i = 0; i < numberOfNewsCards; i++) {
            const markerIndex = (currentDisplayIndex + i) % markers.length; // Wrap-around logic
            markers[markerIndex].classList.add("active");
        }
    }

    // Navigate forward
    function moveForward() {
        currentDisplayIndex = (currentDisplayIndex + 1) % imagePaths.length;
        updateImages();
    }

    // Navigate backward
    function moveBackward() {
        currentDisplayIndex =
            (currentDisplayIndex - 1 + imagePaths.length) % imagePaths.length;
        updateImages();
    }

    // Reset the auto-navigation timer
    function resetTimer() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(moveForward, intervalDuration);
    }

    // Add event listeners for navigation buttons
    leftArrow.addEventListener("click", () => {
        moveBackward();
        resetTimer();
    });

    rightArrow.addEventListener("click", () => {
        moveForward();
        resetTimer();
    });

    // Initialize auto-navigation
    autoSlideInterval = setInterval(moveForward, intervalDuration);

    // Load initial images and markers
    loadImages();

    // Attach event listener to the button and initialize
    document.addEventListener('DOMContentLoaded', () => {
        const button = document.getElementById('darkModeToggle');
        button.addEventListener('click', toggleDarkMode);
        updateDarkMode(); // Set initial state
    });

    // Function to update the screen width
    function updateScreenWidth() {
        numberOfNewsCards = Math.max(Math.floor(window.innerWidth / minWidthForNewsCard), 1);
        document.documentElement.style.setProperty('--number_of_news_cards', numberOfNewsCards);
        updateImages();
        updateMarkers();
    }

    // Add an event listener for the resize event
    window.addEventListener('resize', updateScreenWidth);

    // Call the function once to initialize the value on load
    updateScreenWidth();
});
