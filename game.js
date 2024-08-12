//import Enemy from "./Enemy";
import { keyPress, key } from "./keyboard";
import Hero from "./Hero";
import { loadImage } from "./loaderAssets";
//import redCircle from "./geometries/redCirc";

let CTX;
let CANVAS;
const FRAMES = 60;

//const qtdEnemies = 1;

//let enemies = Array.from({ length: qtdEnemies });

const hero = new Hero(
  50,
  50,
  20,
  0.65,
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

const game = async () => {
  console.log("Initialize Canvas");
  CANVAS = document.querySelector("canvas");
  CTX = CANVAS.getContext("2d");
  boundaries = {
    width: CANVAS.width + 5,
    height: CANVAS.height + 5,
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
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    // redCircle(CTX);

    // smile.move(boundaries, key);
    // smile.draw(CTX);
    if (bgPattern) {
      CTX.fillStyle = "#AAAAAA";
      CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    }
    hero.move(boundaries, key);
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
