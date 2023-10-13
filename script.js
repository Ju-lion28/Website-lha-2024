const loadPageWithAnimation = (url) => {
    // Apply a loading transition effect (e.g., fading)
    document.body.style.opacity = 0;

    // Remove the loading transition effect after a delay and redirect to the URL
    setTimeout(() => {
        window.location.href = url; // Redirect to the clicked URL
    }, 300); // Adjust the timeout duration as needed
};

// Event listener for navigation links (including images inside anchor tags)
document.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element is a navigation link or a child element of a link
    if (target.tagName === 'A' || target.closest('a')) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the URL of the clicked link
        const url = (target.tagName === 'A') ? target.getAttribute('href') : target.closest('a').getAttribute('href');

        // Load the new page with animation and redirect to the URL
        loadPageWithAnimation(url);
    }
});


// Check if there is a stored theme preference, and if not, set the default theme to "light"
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('fade-in');

    const themeToggleButton = document.getElementById('themeToggleButton');

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            if (storedTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else if (storedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    };
});

// Highscore

// Safety. Makes sure "HIGHSCORE is a number and that it exists"
window.onload = function () {
    if (localStorage.getItem("HIGHSCORE") === null || NaN) {
        localStorage.setItem("HIGHSCORE", Number(0));
    }
}

const highscoreBox = document.getElementById("highscore")

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
var links = document.querySelectorAll('a');
links.forEach(function (link) {
    link.addEventListener('click', function () {
        localStorage.HIGHSCORE = Number(localStorage.HIGHSCORE) + 10;
        updateHighScoreDOM(localStorage.HIGHSCORE);
    });
});

//Reset button
const resetButton = document.getElementById("resetbutton")

// Set highscore to 0
resetButton.onclick = function resetScore() {
    console.log("Score Reset")
    localStorage.setItem("HIGHSCORE", Number(0 - 2)); //Forces HIGHSCORE to show as 0
}

// Show clear button and hide score
highscoreBox.onmouseover = function () {
    resetButton.hidden = false
    highscoreBox.hidden = true
}

// Hide clear button and show score
highscoreBox.onmouseout = function () {
    resetButton.hidden = true
    highscoreBox.hidden = false
}