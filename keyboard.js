let key = null;
let activeKeys = new Set();

function keyPress(element) {
  element.addEventListener("keydown", (event) => {
    activeKeys.add(event.key.toLowerCase());
    key = event.key.toLowerCase();
  });

  element.addEventListener("keyup", (event) => {
    activeKeys.delete(event.key.toLowerCase());

    if (activeKeys.size === 0) {
      key = null;
    } else {
      key = Array.from(activeKeys).pop();
    }
  });
}

export { keyPress, key, activeKeys };
