// Function to load a new page and handle transitions
const loadPage = (url) => {
	// Apply a transition effect (e.g., fading) before loading new content
	document.body.style.opacity = 0;

	// Fetch the new page content
	fetch(url)
		.then(response => response.text())
		.then(data => {
			// Replace the content of the entire body with the new page's content
			document.body.innerHTML = data;

			// Remove the transition effect after loading new content
			setTimeout(() => {
				document.body.style.opacity = 1;
			}, 1000); // Adjust the timeout duration as needed
		});
};

// Event listeners for navigation links (including images inside anchor tags)
document.addEventListener('click', (event) => {
	const target = event.target;

	// Check if the clicked element is a navigation link or a child element of a link
	if (target.tagName === 'A' || target.closest('a')) {
		event.preventDefault(); // Prevent the default link behavior

		// Get the URL of the clicked link
		const url = (target.tagName === 'A') ? target.getAttribute('href') : target.closest('a').getAttribute('href');
  
		// Load the new page
		loadPage(url);
	}
});

// Check if there is a stored theme preference, and if not, set the default theme to "light"
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
	document.documentElement.setAttribute('data-theme', storedTheme);
} else {
	document.documentElement.setAttribute('data-theme', 'light');
}

document.addEventListener('DOMContentLoaded', function() {
	const lightThemeButton = document.getElementById('light-theme');
	const darkThemeButton = document.getElementById('dark-theme');
	console.log(lightThemeButton)
	console.log(darkThemeButton)

	lightThemeButton.addEventListener('click', () => {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light'); // Store the theme preference
	});

	darkThemeButton.addEventListener('click', () => {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark'); // Store the theme preference
	});
});