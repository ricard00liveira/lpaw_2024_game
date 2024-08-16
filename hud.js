let life = 100;
let CANVAS = document.querySelector("canvas");
let CTX = CANVAS.getContext("2d");

function imprimirLife(posX, posY) {
  CTX.font = "18px Arial";
  CTX.fillStyle = "gold";
  CTX.fillText("Vida: " + life, posX, posY);
}

export { life, imprimirLife };
