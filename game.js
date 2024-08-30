import Enemy from "./Enemy";
import { keyPress, key } from "./keyboard";
import Hero from "./Hero";
import {
  soundColide,
  soundCollect,
  soundGameOver,
  imgCenario,
} from "./preload";
import {
  imprimirLife,
  startCounter,
  imprimirTempo,
  stopCounter,
  imprimirHud,
  imprimirGameOver,
  imprimirShoot,
  seconds,
} from "./hud";
const start = async () => {
  const FRAMES = 60;
  const hero = new Hero(350, 225, 20, 5, 75, 75, FRAMES);
  const maxHeroLife = 100;
  let heroLife = 100;
  let bulletLifeGain = 10;
  let CTX;
  let CANVAS;

  //Enemy
  const qtdEnemies = 10;
  const speedEnemies = 5;
  let speedEnemiesNew = speedEnemies + seconds / 10;
  const sizeEnemies = 13; //Área do colide (hitbox)
  const baseDano = 5;
  let danoColide;
  let enemies;

  let gameover = false;
  let anime;
  let boundaries;
  const hubSize = 30;
  let canShoot = true;
  let invulnerable = false; // Flag de invulnerabilidade
  const invulnerabilityDuration = 50;

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

  function reloadGun() {
    setTimeout(() => {
      canShoot = true;
    }, 1250);
  }

  function removeEnemyById(id) {
    enemies = enemies.filter((enemy) => enemy.id !== id);
  }
  function removeBulletById(id) {
    hero.bullets = hero.bullets.filter((bullet) => bullet.id !== id);
  }

  function gainLife(vidaMaxima) {
    if (heroLife + bulletLifeGain <= 100 && heroLife + bulletLifeGain > 0) {
      heroLife += bulletLifeGain;
    } else {
      heroLife = vidaMaxima;
    }
  }

  function calculoDano(danoBase, tempo) {
    let resultado = danoBase + Math.ceil(tempo / 10);
    console.log("Dano: ", resultado);
    return resultado;
  }

  function addEnemy(x, y, limitX, limitY, size, speed, id, tamX, tamY, FRAMES) {
    const newEnemy = new Enemy(
      x,
      y,
      limitX,
      limitY,
      size,
      speed,
      id,
      tamX,
      tamY,
      FRAMES
    );
    enemies.push(newEnemy);
    danoColide = calculoDano(baseDano, seconds);
    takeDamage(danoColide);
  }

  const game = async () => {
    console.group("Game");
    console.log("Initialize Canvas");
    CANVAS = document.getElementById("gameCanvas");
    CTX = CANVAS.getContext("2d");

    boundaries = {
      width: CANVAS.width,
      height: CANVAS.height - hubSize,
    };
    console.log(boundaries);

    // Inicializar inimigos
    enemies = Array.from(
      { length: qtdEnemies },
      (_, index) =>
        new Enemy(
          0,
          0,
          CANVAS.width,
          CANVAS.height,
          sizeEnemies,
          speedEnemies,
          index,
          100,
          35,
          FRAMES + 20
        )
    );

    console.log(enemies);
    keyPress(window);
    startCounter();
    loop();
    console.groupEnd();
  };

  const loop = () => {
    setTimeout(() => {
      CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

      if (imgCenario) {
        const pattern = CTX.createPattern(imgCenario, "repeat");
        CTX.fillStyle = pattern;
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height - hubSize);
      }

      hero.move(boundaries, key);
      hero.draw(CTX);

      enemies.forEach((enemy) => {
        enemy.move(boundaries);
        enemy.draw(CTX);

        hero.bullets.forEach((bullet) => {
          if (enemy.colide(bullet)) {
            removeEnemyById(enemy.id);
            removeBulletById(bullet.id);
            addEnemy(
              0,
              0,
              CANVAS.width,
              CANVAS.height,
              sizeEnemies,
              speedEnemiesNew,
              enemy.id,
              100,
              35,
              FRAMES
            );
            gainLife(maxHeroLife);
          }
        });

        if (hero.colide(enemy.hit)) {
          // Remove o inimigo da lista quando colidir com o herói
          removeEnemyById(enemy.id);
          addEnemy(
            0,
            0,
            CANVAS.width,
            CANVAS.height,
            sizeEnemies,
            speedEnemiesNew,
            enemy.id,
            100,
            35,
            FRAMES
          );
        }
      });

      hero.updateBullets(boundaries);

      if (key === " " && canShoot) {
        canShoot = false;
        hero.shoot(CTX);
        console.log(hero.bullets);
        reloadGun();
      }
      if (heroLife < 1) {
        gameover = true;
      }
      if (gameover) {
        imprimirHud(hubSize, "rgb(255,0,0,1)");
        imprimirGameOver(400, CANVAS.height - 12);
        stopCounter();
        soundGameOver.play();

        const question = confirm(
          "Você perdeu, mas durou " +
            seconds +
            " segundos no jogo!\nVamos jogar novamente?"
        );
        if (question) {
          window.location.reload(true);
        } else {
          cancelAnimationFrame(anime);
        }
      } else {
        anime = requestAnimationFrame(loop);
        imprimirHud(hubSize);
        imprimirLife(50, CANVAS.height - 11, heroLife);
        imprimirShoot(400, CANVAS.height - 11, canShoot);
        imprimirTempo(700, CANVAS.height - 11);
      }
    }, 1000 / FRAMES);
  };

  // Iniciar o jogo
  await game();
};

export { start };
