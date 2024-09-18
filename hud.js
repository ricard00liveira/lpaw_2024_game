let CANVAS = document.getElementById("gameCanvas");
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

function imprimirLife(posX, posY, heroLife, maxLife) {
  const barWidth = 200;
  const barHeight = 15;
  const lifePercentage = heroLife / maxLife;
  const filledWidth = barWidth * lifePercentage;
  CTX.font = "22px MedievalSharp";
  CTX.fillStyle = "gold";
  CTX.fillText("Vida:", posX, posY - 3);
  CTX.strokeStyle = "#000000";
  CTX.lineWidth = 2;
  CTX.strokeRect(posX + 30, posY - 10, barWidth - 1, barHeight - 1);
  if (lifePercentage > 0.7) {
    CTX.fillStyle = "green";
  } else if (lifePercentage <= 0.7 && lifePercentage > 0.35) {
    CTX.fillStyle = "yellow";
  } else if (lifePercentage <= 0.35 && lifePercentage > 0.15) {
    CTX.fillStyle = "red";
  } else {
    CTX.fillStyle = "#200a01";
  }
  CTX.fillRect(posX + 31, posY - 9, filledWidth - 3, barHeight - 3);
}

function imprimirTempo(posX, posY) {
  CTX.font = "22px MedievalSharp";
  CTX.fillStyle = "gold";
  CTX.fillText("Tempo: " + seconds, posX, posY);
}

function imprimirShoot(posX, posY, status) {
  CTX.font = "22px MedievalSharp";
  CTX.fillStyle = "gold";
  CTX.fillText("Tiro: ", posX, posY - 3);
  if (status) {
    CTX.fillStyle = "green";
    CTX.font = "24px MedievalSharp";
    CTX.fillText("✔", posX + 35, posY - 1);
  } else {
    CTX.fillStyle = "red";
    CTX.font = "24px MedievalSharp";
    CTX.fillText("X", posX + 35, posY - 1);
  }
}

function imprimirGameOver(posX, posY) {
  CTX.font = "22px MedievalSharp";
  CTX.fillStyle = "gold";
  CTX.fillText("GAME OVER !!!", posX, posY);
}

function imprimirHud(size, color = "#333333") {
  //console.log("Canvas HUD = w: " + CANVAS.width + ", h: " + CANVAS.height);
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
  imprimirShoot,
};
