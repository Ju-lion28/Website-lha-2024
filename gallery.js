const originalImageList = [
    'Kurt Francis Ocampo.jpg',
    'Rory_Dore.png',
    'blank.webp',
    'julian.jpg',
    'olivia.jpg',
    'tiarra.jpg',
    'Mony Chornai Sang.jpg',
    'abadi.jpg',
    'eli.jpg',
    'kurt.jpg',
    'rayhaan.jpg',
    'yanni.jpg',
    'Nathan Yarmush.jpg',
    'arwyn.jpg',
    'ethan.jpg',
    'mauricio.jpg',
    'samir.jpg'
];

//Negative index https://javascript.info/task/array-negative

imageList = new Proxy(originalImageList, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});

var position = 0
const imageContainer = document.getElementById("imageContainer")

function changeImage(e) {

    if (e.includes("+")) {
        position += parseInt(e.trim());
      } else if (e.includes("-")) {
        position -= -parseInt(e.trim());
      } else {
        position = position;
      }
    console.log(position)

    let imagesrc = encodeURIComponent(imageList[position])

    imageContainer.setAttribute("src", `${window.location.origin}/assets/content/images/roster/${imagesrc}`)
}


