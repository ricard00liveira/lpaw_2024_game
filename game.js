//import Enemy from "./Enemy";
import { keyPress, key, activeKeys } from "./keyboard";
import Hero from "./Hero";
import { loadImage } from "./loaderAssets";
import { imprimirLife } from "./hud";
//import redCircle from "./geometries/redCirc";

let CTX;
let CANVAS;
const FRAMES = 60;

//const qtdEnemies = 1;

//let enemies = Array.from({ length: qtdEnemies });

const hero = new Hero(
  51,
  51,
  20,
  5,
  102,
  102,
  "/sprite_char_transparente.png",
  FRAMES
);

let gameover = false;
let anime;
let boundaries;
let bgImage;
let bgPattern;
let hubSize = 30;
let canShoot = true;

const game = async () => {
  console.log("Initialize Canvas");
  CANVAS = document.querySelector("canvas");
  CTX = CANVAS.getContext("2d");
  boundaries = {
    width: CANVAS.width,
    height: CANVAS.height - hubSize,
  };

  // Carregar a imagem de fundo
  bgImage = await loadImage("/dust.png");
  bgPattern = CTX.createPattern(bgImage, "repeat");

  // enemies = enemies.map(
  //   (i) =>
  //     new Enemy(
  //       Math.random() * CANVAS.width,
  //       Math.random() * CANVAS.height,
  //       10,
  //       5,
  //       "red"
  //     )
  // );

  keyPress(window);

  loop();
};

const loop = () => {
  setTimeout(() => {
    //console.log("Key: ", key);
    //console.log("Array Keys: ", activeKeys);
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    // redCircle(CTX);

    // smile.move(boundaries, key);
    // smile.draw(CTX);
    if (bgPattern) {
      CTX.fillStyle = "#AAAAAA";
      CTX.fillRect(0, 0, CANVAS.width, CANVAS.height - hubSize);
      CTX.fillStyle = "#333333";
      CTX.fillRect(0, CANVAS.height - hubSize, CANVAS.width, CANVAS.height);
      imprimirLife(15, CANVAS.height - 7);
    }

    hero.move(boundaries, key);
    if(key == ' ' && canShoot == true) {
      canShoot = false;
      hero.shoot(CTX);
      canShoot = true;
    }
    hero.draw(CTX);
    // enemies.forEach((e) => {
    //   e.move(boundaries, 0);
    //   e.draw(CTX);
    //   //var = teste?verdadeiro:falso;
    //   gameover = !gameover ? hero.colide(e) : true;
    // });

    if (gameover) {
      console.error("MORREU!!!");
      cancelAnimationFrame();
    } else {
      anime = requestAnimationFrame(loop);
    }
  }, 1000 / FRAMES);
};

export { game };
