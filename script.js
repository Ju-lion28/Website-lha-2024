var journalNav = document.getElementById("journalNav");
var crcNav = document.getElementById("crcNav");
var gameNav = document.getElementById("gameNav");
var rosterNav = document.getElementById("rosterNav");
var frenchNav = document.getElementById("frenchNav");

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

/////////////////////////////////////////////////////////////////////////////////

// document.onload = function() {
//   changeScore()
// }

// function changeScore(value) {
//   let highScore = localStorage.getItem("highScore");

//   console.log(highScore)

//   if (value === null || NaN) {
//     console.log(highScore);
//     document.getElementById("highscoreElement").innerText = highScore.toString();
//   } else {
//     localStorage.setItem("highScore", Number(highScore) + value);

//     console.log(highScore);

//     document.getElementById("highscoreElement").innerText = highScore.toString();
//   }

//   console.log(highScore)

// }

// let aElements = document.getElementsByTagName('a');
// for (let i = 0; i < aElements.length; i++) {
//   aElements[i].addEventListener("click", function() {
//     changeScore(10)
//   });
// }

// document.addEventListener("click", function() {
//   changeScore(1)
// });


