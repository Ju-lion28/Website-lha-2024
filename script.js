const loadPageWithAnimation = (url, target) => {
    // Makes sure in-page links work
    if (url === null) {
        document.body.style.opacity = 100;
    } else if (url.toString().includes("#")) {

        const targetId = url.substring(url.indexOf("#" + 1));
        const header = document.getElementById("header")
        const targetElement = document.getElementById(targetId.replace("#", ''));

        function smoothScroll(element, options) {
            return new Promise((resolve) => {
                element.scrollIntoView(options);
        
                function checkScroll() {
                    const rect = element.getBoundingClientRect();
                    if (Math.abs(rect.top) < 1) {
                        resolve();
                    } else {
                        requestAnimationFrame(checkScroll);
                    }
                }
                requestAnimationFrame(checkScroll);
            });
        }
        
        if (targetElement) { 
            smoothScroll(targetElement, { behavior: "smooth", block: 'start' })
                .then(() => {
                    window.scrollBy(0, -header.offsetHeight);
                });
        }
        
        document.body.style.opacity = 100;
    } else if (target === "_blank") {
        // If the target is _blank, open the link in a new tab
        window.open(url, "_blank");
    } else {
        document.body.style.opacity = 0;
  
        // Remove the loading transition effect after a delay and redirect to the URL
        setTimeout(() => {
            window.location.href = url; // Redirect to the clicked URL
        }, 300); // Adjust the timeout duration as needed
    }
};

// Event listener for navigation links (including images inside anchor tags)
document.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the clicked element is a navigation link or a child element of a link
    if (target.tagName === "A" || target.closest("a")) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the URL and target attribute of the clicked link
        let url, targetAttr;
        if (target.tagName === "A") {
            url = target.getAttribute("href");
            targetAttr = target.getAttribute("target");
        } else {
            const closestLink = target.closest("a");
            url = closestLink.getAttribute("href");
            targetAttr = closestLink.getAttribute("target");
        }

        // Load the new page with animation and redirect to the URL, including target attribute
        console.log(url, targetAttr)
        loadPageWithAnimation(url, targetAttr);
    }
});

// Check if there is a stored theme preference, and if not, set the default theme to browser theme
// But also check if user has language preference, and if not, set it to browser language

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");

    let storedTheme = localStorage.getItem("theme") || "light";
    let storedLanguage = localStorage.getItem("language");
    let themeToggleButton = document.getElementById("themeToggleButton");
    let themeIcon = document.getElementById("themeIcon");
    let hamburgerIcon = document.querySelector('.hamburger-icon');
    let navbarButtons = document.querySelector('.navbar-buttons');

    let logo = document.getElementById('logo');
    let openNav = document.getElementById("openNavImage");
    let closeNav = document.getElementById("closeSidenav");
    let crc_logo = document.getElementById("crc_logo");
    let hamburgerImg = document.getElementById("hamburgerIcon");
    let translateButton = document.getElementById("langIcon");

    hamburgerIcon.addEventListener('click', () => navbarButtons.classList.toggle('show'));

    function updateTheme(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeIcon.src = `../assets/icons/theme/${newTheme}.svg`;
        hamburgerImg.src = `../assets/icons/hamburger_${newTheme}.svg`;
        translateButton.src = `../assets/icons/translate_${newTheme}.svg`;
        if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
            logo.src = `./assets/content/images/home/logo_${newTheme}.webp`;
        } else if (window.location.pathname === '/pages/journal.html') {
            openNav.src = `../assets/icons/nav/openNav_${newTheme}.svg`;
            closeNav.src = `../assets/icons/nav/closeNav_${newTheme}.svg`;
        } else if (window.location.pathname === '/pages/game.html') {
            crc_logo.src = `../assets/content/images/Game/CRC_Logo_${newTheme}.webp`;
        }
    }

    document.documentElement.setAttribute("data-theme", storedTheme);
    themeIcon.src = `../assets/icons/theme/${storedTheme}.svg`;
    hamburgerImg.src = `../assets/icons/hamburger_${storedTheme}.svg`;
    translateButton.src = `../assets/icons/translate_${storedTheme}.svg`;
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        logo.src = `./assets/content/images/home/logo_${storedTheme}.webp`;
    } else if (window.location.pathname === '/pages/journal.html') {
        openNav.src = `../assets/icons/nav/openNav_${storedTheme}.svg`;
        closeNav.src = `../assets/icons/nav/closeNav_${storedTheme}.svg`;
    } else if (window.location.pathname === '/pages/game.html') {
        crc_logo.src = `../assets/content/images/Game/CRC_Logo_${storedTheme}.webp`;
    }

    themeToggleButton.addEventListener("click", () => {
        storedTheme = storedTheme === "light" ? "dark" : "light";
        updateTheme(storedTheme);
    });

    if (!storedLanguage) {
        let browserLanguage = (navigator.language || "en").split("-")[0];
        document.documentElement.setAttribute("language", browserLanguage);
        localStorage.setItem("language", browserLanguage);
    } else {
        document.documentElement.setAttribute("language", storedLanguage);
    }
});

// Highscore

// Safety. Makes sure "HIGHSCORE is a number and that it exists"
window.onload = function () {
    if (localStorage.getItem("HIGHSCORE") === null || NaN) {
        localStorage.setItem("HIGHSCORE", Number(0));
    }
};

const highscoreBox = document.getElementById("highscoreBox");

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
highscoreBox.onmouseenter = function () {
    resetButton.hidden = false;
    highscoreBox.hidden = true;
};

// Hide clear button and show score
highscoreBox.onmouseleave = function () {
    resetButton.hidden = true;
    highscoreBox.hidden = false;
};