/*
This things is a weird script. It runs locally.

Basically, it imports a library that can read html as if it were 'in a browser'

After that it runs the necessary code(browser style) on the input roster file.

It outputs the proper alt tags on the 'good copy' 

it's a little trippy because I'm writting web js code in an 'offline' environement

*/
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

try {
  const data = fs.readFileSync('./testFiles/en_roster-copy.html', 'utf8');
  
  const dom = new JSDOM(data.toString());
  const document = dom.window.document;

  // Code to change alt tags
  const people = document.getElementsByClassName("person");

  for (let person of people) {
    // Person name. Based on title, a.k.a (element[0]) of 'person' div
    let name = person.children[0].textContent.trim();
    let img = person.querySelector("img");

    // Update alt attribute directly
    img.setAttribute("alt", name);
  }
  
  // Write to test output
  fs.writeFile('./testFiles/en_roster-copy-good.html', document.documentElement.outerHTML, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Done")
    }
  });

} catch (error) {
  console.error(error);
}


