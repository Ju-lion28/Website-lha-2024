// Loading Animation
const loadPageWithAnimation = (url) => {
    document.body.style.opacity = 0;

    // Remove the loading transition effect after a delay and redirect to the URL
    setTimeout(() => {
        window.location.href = url; // Redirect to the clicked URL
    }, 300); // Adjust the timeout duration as needed
};

// Event listener for navigation links (including images inside anchor tags)
document.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the clicked element is a navigation link or a child element of a link
    if (target.tagName === "A" || target.closest("a")) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the URL of the clicked link
        const url =
            target.tagName === "A"
                ? target.getAttribute("href")
                : target.closest("a").getAttribute("href");

        // Load the new page with animation and redirect to the URL
        loadPageWithAnimation(url);
    }
});

// Check if there is a stored theme preference, and if not, set the default theme to browser theme
// But also check if user has language preference, and if not, set it to browser language

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");

    let storedTheme = localStorage.getItem("theme");
    let storedLanguage = localStorage.getItem("language");
    let themeToggleButton = document.getElementById("themeToggleButton");
    let themeIcon = document.getElementById("themeIcon");
    let hamburgerIcon = document.querySelector('.hamburger-icon');
    let navbarButtons = document.querySelector('.navbar-buttons');

    hamburgerIcon.addEventListener('click', function () {
        navbarButtons.classList.toggle('show');
    });

    if (localStorage.getItem("theme")) {
        console.log("found theme")
        console.log(localStorage.getItem("theme"))
        document.documentElement.setAttribute("data-theme", storedTheme);
        themeIcon.setAttribute(
            "src",
            `../assets/images/icons/theme/${storedTheme}.svg`
        );
    } else {
        console.log("default")
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.setAttribute(
            "src",
            "../assets/images/icons/theme/light.svg"
        );
        localStorage.setItem("theme", "light");
        storedTheme = localStorage.getItem("theme")
    }

    if (localStorage.getItem("language")) {
        document.documentElement.setAttribute("language", storedLanguage);
    } else {
        let browserLanguage = navigator.language || "en";
        browserLanguage = browserLanguage.split("-")[0];

        document.documentElement.setAttribute("language", browserLanguage);
        localStorage.setItem("language", browserLanguage);
        storedLanguage = localStorage.getItem("language")
    }

    themeToggleButton.addEventListener("click", () => {
        console.log("running")
        if (storedTheme === "light") {
            console.log("light to dark")
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark"); // Update and store the theme
            storedTheme = localStorage.getItem("theme"); // Update the storedTheme variable
            themeIcon.setAttribute(
                "src",
                "../assets/images/icons/theme/dark.svg"
            );
        } else if (storedTheme === "dark") {
            console.log("dark to light")
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light"); // Update and store the theme
            storedTheme = localStorage.getItem("theme"); // Update the storedTheme variable
            themeIcon.setAttribute(
                "src",
                "../assets/images/icons/theme/light.svg"
            );
        }
    });
});

// Highscore

// Safety. Makes sure "HIGHSCORE is a number and that it exists"
window.onload = function () {
    if (localStorage.getItem("HIGHSCORE") === null || NaN) {
        localStorage.setItem("HIGHSCORE", Number(0));
    }
};

const highscoreBox = document.getElementById("highscore");

// Modifies in DOM
function updateHighScoreDOM(score) {
    highscoreBox.innerHTML = "Highscore: " + score;
}

// DOM event listeners, click and keydown

// Syntax source of 'localStorage.HIGHSCORE': https://www.w3schools.com/jsref/prop_win_localstorage.asp

document.onclick = function () {
    localStorage.HIGHSCORE = Number(localStorage.HIGHSCORE) + 2;
    updateHighScoreDOM(localStorage.HIGHSCORE);
};

document.onkeydown = function () {
    localStorage.HIGHSCORE = Number(localStorage.HIGHSCORE) + 1;
    updateHighScoreDOM(localStorage.HIGHSCORE);
};

//Link event listener
var links = document.querySelectorAll("a");
links.forEach(function (link) {
    link.addEventListener("click", function () {
        localStorage.HIGHSCORE = Number(localStorage.HIGHSCORE) + 10;
        updateHighScoreDOM(localStorage.HIGHSCORE);
    });
});

//Reset button
const resetButton = document.getElementById("resetButton");

// Set highscore to 0
resetButton.onclick = function resetScore() {
    console.log("Score Reset");
    localStorage.setItem("HIGHSCORE", Number(0 - 2)); //Forces HIGHSCORE to show as 0
};

// Show clear button and hide score
highscoreBox.onmouseover = function () {
    resetButton.hidden = false;
    highscoreBox.hidden = true;
};

// Hide clear button and show score
highscoreBox.onmouseout = function () {
    resetButton.hidden = true;
    highscoreBox.hidden = false;
};
