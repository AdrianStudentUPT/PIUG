//localStorage.setItem("myBool_darkMode", true); // Saves as a string
let myBool_darkMode = localStorage.getItem("myBool_darkMode") === "true";
//localStorage.removeItem("myBool_darkMode");

// Function to update the button text and body class based on myBool_darkMode
function updateDarkMode() {
    //const body = document.querySelector('.body'); //class="body"
    const body = document.getElementById('body');
    const button = document.getElementById('darkModeToggle');

    if (myBool_darkMode) {
        body.classList.add('dark-mode');
        button.textContent = "Dark Mode: ON";
    } else {
        body.classList.remove('dark-mode');
        button.textContent = "Dark Mode: OFF";
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    myBool_darkMode = !myBool_darkMode; // Toggle the value
    localStorage.setItem("myBool_darkMode", myBool_darkMode); // Save to localStorage
    updateDarkMode(); // Update UI
}

// Attach event listener to the button and initialize
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('darkModeToggle');
    button.addEventListener('click', toggleDarkMode);
    updateDarkMode(); // Set initial state
});