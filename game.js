import Enemy from "./Enemy";
import { keyPress, key, activeKeys } from "./keyboard";
import Hero from "./Hero";
import { loadImage, loadAudio } from "./loaderAssets";
import {
  imprimirLife,
  startCounter,
  imprimirTempo,
  stopCounter,
  imprimirHud,
  imprimirGameOver,
  seconds,
} from "./hud";

let heroLife = 100;
let CTX;
let CANVAS;
let soundColide;
let soundGameOver;
const FRAMES = 60;
const qtdEnemies = 15;

let enemies = Array.from({ length: qtdEnemies });
const hero = new Hero(
  300,
  300,
  20,
  5,
  75,
  75,
  "/sprite_char_transparente.png",
  FRAMES
);

let gameover = false;
let anime;
let boundaries;
let bgImage;
let bgPattern;
const hubSize = 30;
let canShoot = true;
let invulnerable = false; // Flag de invulnerabilidade
const invulnerabilityDuration = 700;
const danoColide = 10;

function takeDamage(amount) {
  if (!invulnerable) {
    if (soundColide) {
      soundColide.play();
    }
    heroLife -= amount;

    invulnerable = true;

    setTimeout(() => {
      invulnerable = false;
    }, invulnerabilityDuration);
  }
}

const game = async () => {
  console.log("Initialize Canvas");
  CANVAS = document.querySelector("canvas");
  CTX = CANVAS.getContext("2d");
  boundaries = {
    width: CANVAS.width,
    height: CANVAS.height - hubSize,
  };

  // Carregar áudio
  try {
    soundColide = await loadAudio("sounds/colide_cut.mp3");
    soundColide.volume = 0.5;
  } catch (error) {
    soundColide = null;
    console.error("Erro ao carregar áudio:", error);
  }
  try {
    soundGameOver = await loadAudio("sounds/gameover.mp3");
    soundGameOver.volume = 0.75;
  } catch (error) {
    soundGameOver = null;
    console.error("Erro ao carregar áudio:", error);
  }

  // Carregar a imagem de fundo
  bgImage = await loadImage("/dust.png");
  bgPattern = CTX.createPattern(bgImage, "repeat");

  // Inicializar inimigos
  enemies = enemies.map(
    () =>
      new Enemy(
        Math.random() * CANVAS.width,
        Math.random() * CANVAS.height,
        10,
        2,
        "red"
      )
  );

  console.log(enemies);
  keyPress(window);
  startCounter();
  loop();
};

const loop = () => {
  setTimeout(() => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    if (bgPattern) {
      CTX.fillStyle = bgPattern;
      CTX.fillRect(0, 0, CANVAS.width, CANVAS.height - hubSize);
    }

    imprimirHud(hubSize);
    imprimirLife(15, CANVAS.height - 7, heroLife);
    imprimirTempo(700, CANVAS.height - 7);

    hero.move(boundaries, key);
    hero.draw(CTX);

    enemies.forEach((enemy) => {
      enemy.move(boundaries);
      enemy.draw(CTX);

      if (hero.colide(enemy)) {
        takeDamage(danoColide);
        if (heroLife <= 0) {
          soundGameOver.play();
          imprimirHud(hubSize, "rgb(255,0,0,1)");
          imprimirGameOver(300, CANVAS.height - 7);
          gameover = true;
        }
      }
    });

    hero.updateBullets(boundaries);

    if (key === " " && canShoot) {
      hero.shoot(CTX);
      console.log(hero.bullets);
      canShoot = false;
    }

    if (gameover) {
      stopCounter();
      console.error("Game Over!!!");
      cancelAnimationFrame(anime);
      const question = confirm(
        "Você perdeu, mas durou " +
          seconds +
          " segundos no jogo!\nVamos jogar novamente?"
      );
      if (question) {
        window.location.reload(true);
      }
    } else {
      anime = requestAnimationFrame(loop);
    }
  }, 1000 / FRAMES);
};

export { game };
