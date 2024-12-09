document.addEventListener('DOMContentLoaded', () => {
    const  button = document.getElementById('darkModeToggle');
    const body = document.getElementById('body');

    // Retrieve the dark mode state from localStorage
    let myBool_darkMode = localStorage.getItem("myBool_darkMode") === "true";
    //localStorage.setItem("myBool_darkMode", true); // Saves as a string
    //localStorage.removeItem("myBool_darkMode");

    // Function to update the button text and body class based on myBool_darkMode
    function updateDarkMode() {
        if (myBool_darkMode) {
            document.documentElement.style.setProperty('--color_tone_1', "rgba(150, 150, 150, 1)");
            document.documentElement.style.setProperty('--color_tone_2', "rgba(168, 224, 202, 1)");
            document.documentElement.style.setProperty('--color_tone_3', "rgba(11, 19, 43, 1)");
            document.documentElement.style.setProperty('--color_tone_4', "rgba(43, 128, 153, 1)");
            document.documentElement.style.setProperty('--color_tone_5', "rgba(76, 0, 153, 1)");
            document.documentElement.style.setProperty('--color_tone_6', "rgba(233, 233, 233, 0.5)");
            document.documentElement.style.setProperty('--color_tone_7', "rgba(160, 160, 255, 1)");
            document.documentElement.style.setProperty('--color_tone_8', "rgba(200, 200, 200, 1)");
            document.documentElement.style.setProperty('--box_shadow_1', "0px 8px 16px rgba(255, 255, 255, 0.2), 0px -8px 16px rgba(255, 255, 255, 0.2), 8px 0px 16px rgba(255, 255, 255, 0.2), -8px 0px 16px rgba(255, 255, 255, 0.2)");
            if (button != null) {
                button.textContent = "Dark Mode: ON";
            }
        } else {
            document.documentElement.style.setProperty('--color_tone_1', "rgba(218, 255, 252, 1)");
            document.documentElement.style.setProperty('--color_tone_2', "rgba(168, 224, 202, 1)");
            document.documentElement.style.setProperty('--color_tone_3', "rgba(233, 233, 233, 1)");
            document.documentElement.style.setProperty('--color_tone_4', "rgba(43, 128, 153, 1)");
            document.documentElement.style.setProperty('--color_tone_5', "rgba(76, 0, 153, 1)");
            document.documentElement.style.setProperty('--color_tone_6', "rgba(233, 233, 233, 0.5)");
            document.documentElement.style.setProperty('--color_tone_7', "rgba(160, 160, 255, 1)");
            document.documentElement.style.setProperty('--color_tone_8', "rgba(255, 255, 255, 1)");
            document.documentElement.style.setProperty('--box_shadow_1', "0px 8px 16px rgba(0, 0, 0, 0.2), 0px -8px 16px rgba(0, 0, 0, 0.2), 8px 0px 16px rgba(0, 0, 0, 0.2), -8px 0px 16px rgba(0, 0, 0, 0.2)");
            if (button != null) {
                button.textContent = "Dark Mode: OFF";
            }
        }
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        myBool_darkMode = !myBool_darkMode; // Toggle the value
        localStorage.setItem("myBool_darkMode", myBool_darkMode); // Save to localStorage
        updateDarkMode(); // Update UI
    }

    // Attach event listener to the button
    if (button != null) {
        button.addEventListener('click', toggleDarkMode);
    }

    // Set initial state
    updateDarkMode();

    // Select the header element
    const header = document.getElementById("HEADER");

    // Find the link with the "active" class inside the header
    const activeLink = header.querySelector(".menu a.active");

    if (activeLink) {
        // Append ">" to the inner HTML of the active link
        activeLink.innerHTML = ">> " + activeLink.innerHTML;
    }
});

