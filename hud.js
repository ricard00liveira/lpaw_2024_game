let CANVAS = document.querySelector("canvas");
let CTX = CANVAS.getContext("2d");
let seconds = 0;
let intervalId;

function startCounter() {
  intervalId = setInterval(() => {
    seconds++;
    //console.log(seconds);
  }, 1000);
}

function stopCounter() {
  clearInterval(intervalId);
}

function imprimirLife(posX, posY, heroLife) {
  CTX.font = "18px Arial";
  CTX.fillStyle = "gold";
  CTX.fillText("Vida: " + heroLife, posX, posY);
}

function imprimirTempo(posX, posY) {
  CTX.font = "18px Arial";
  CTX.fillStyle = "gold";
  CTX.fillText("Tempo: " + seconds, posX, posY);
}

function imprimirGameOver(posX, posY) {
  CTX.font = "22px Arial";
  CTX.fillStyle = "gold";
  CTX.fillText("GAME OVER !!!", posX, posY);
}

function imprimirHud(size, color = "#333333") {
  CTX.fillStyle = color;
  CTX.fillRect(0, CANVAS.height - size, CANVAS.width, CANVAS.height);
}

export {
  imprimirLife,
  startCounter,
  imprimirTempo,
  stopCounter,
  imprimirHud,
  imprimirGameOver,
  seconds,
};
