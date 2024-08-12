let key;

function keyPress(element) {
  element.addEventListener("keypress", (event) => {
    key = event.key.toLowerCase();
  });
}

export { keyPress, key };
