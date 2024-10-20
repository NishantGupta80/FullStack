const imageUrlInput = document.getElementById("image-url-input");
const addBtn = document.getElementById("image-add-button");
const imagePlaceholder = document.getElementById("image-placeholder");

const IMAGES = JSON.parse(localStorage.getItem("images")) || [];
let currentIndex = -1;

if (IMAGES.length > 0) {
  currentIndex = 0;
  updateImage();
}

function updateImage() {
  if (IMAGES.length === 0) {
    imagePlaceholder.removeAttribute("src");
  } else {
    imagePlaceholder.setAttribute("src", IMAGES[currentIndex]);
  }
}

function moveIndexRight() {
  currentIndex++;
  if (currentIndex === IMAGES.length) {
    currentIndex = 0;
  }
}

function moveIndexLeft() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = IMAGES.length - 1;
  }
}

function goToNextImage() {
  moveIndexRight();
  updateImage();
}

function goToPrevImage() {
  moveIndexLeft();
  updateImage();
}

function clearImage() {
  if (IMAGES.length > 0) {
    IMAGES.splice(currentIndex, 1);
    if (currentIndex >= IMAGES.length) {
      currentIndex = IMAGES.length - 1;
    }
    localStorage.setItem("images", JSON.stringify(IMAGES));
    updateImage();
  }
}

addBtn.addEventListener("click", () => {
  const imageUrl = imageUrlInput.value;
  if (imageUrl) {
    imagePlaceholder.setAttribute("src", imageUrl);
    IMAGES.push(imageUrl);
    localStorage.setItem("images", JSON.stringify(IMAGES));
    currentIndex = IMAGES.length - 1;
  }
});

document.addEventListener("keypress", (event) => {
  const keyPressed = event.key;
  if (keyPressed === "n") {
    goToNextImage();
  }
  if (keyPressed === "p") {
    goToPrevImage();
  }
  if (keyPressed === "c") {
    clearImage();
  }
});
