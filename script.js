const loadPageWithAnimation = (url) => {
    // Apply a loading transition effect (e.g., fading)
    document.body.style.opacity = 0;

    // Remove the loading transition effect after a delay and redirect to the URL
    setTimeout(() => {
        window.location.href = url; // Redirect to the clicked URL
    }, 1000); // Adjust the timeout duration as needed
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

    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');

    if (lightThemeButton && darkThemeButton) {
        lightThemeButton.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Store the theme preference
        });

        darkThemeButton.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Store the theme preference
        });
    };
});