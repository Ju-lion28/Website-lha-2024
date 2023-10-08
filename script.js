var journalNav = document.getElementById("journalNav");
var crcNav = document.getElementById("crcNav");
var gameNav = document.getElementById("gameNav");
var rosterNav = document.getElementById("rosterNav");
var frenchNav = document.getElementById("frenchNav");

document.documentElement.setAttribute('data-theme', 'light');
const lightThemeButton = document.getElementById('light-theme');
const darkThemeButton = document.getElementById('dark-theme');

lightThemeButton.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme', 'light');
});

darkThemeButton.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme', 'dark');
});

// ty gpt my love
document.addEventListener('DOMContentLoaded', function() {
	var menuLinks = document.querySelectorAll('#picker a');

	menuLinks.forEach(function(link) {
		link.addEventListener('click', function(e) {
			var hash = this.hash;
			var targetSection = document.querySelector(hash);
			
			if (targetSection) {
				e.preventDefault();
				
				var topOffset = targetSection.offsetTop;
				var scrollOptions = {
					top: topOffset,
					behavior: 'smooth'
				};

				window.scrollTo(scrollOptions);
			}
		});
	});
});
// end of gpt