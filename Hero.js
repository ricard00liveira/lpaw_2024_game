import Circle from "./geometries/Circle";
import { imgHero, soundShoot } from "./preload";

export default class Hero extends Circle {
  constructor(x, y, size, speed = 1, width, height, FRAMES) {
    super(x, y, size, speed);
    this.width = width;
    this.height = height;
    this.totalSprites = 3;
    this.spriteSpeed = 1;
    this.cellX = 0;
    this.cellY = 0;
    this.status = "stopped";
    this.statusAux = 0;
    this.isStopped = true;
    this.bullets = [];
    this.invulnerable = false;
    this.invulnerabilityDuration = 100;

    this.hit = new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.size,
      0,
      "rgba(0,0,255,.5)"
    );

    this.init(FRAMES); // Inicializa o carregamento da imagem e animação
    this.setControls();
  }

  async init(FRAMES) {
    try {
      if (!imgHero) {
        throw new Error("imgHero não está carregado! Verifique o preload.");
      }
      this.img = imgHero;
      this.cellWidth = this.img.naturalWidth / this.totalSprites + 0.5;
      this.cellHeight = 51;
      this.animeSprite(FRAMES);
    } catch (error) {
      console.error("Erro ao inicializar o Hero:", error);
    }
  }

  draw(CTX) {
    this.setCellY();

    CTX.drawImage(
      this.img,
      this.cellX * this.cellWidth,
      this.cellY * this.cellHeight,
      this.cellWidth,
      this.cellHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.bullets.forEach((bullet) => bullet.draw(CTX));

    // Descomentar para ver a área de hit
    // this.hit.draw(CTX);
  }

  animeSprite(FRAMES) {
    //Controla a animacao do sprite
    setInterval(() => {
      if (this.status != "stopped") {
        this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
      } else {
        this.cellX = 0;
      }
    }, 1000 / ((FRAMES * this.spriteSpeed) / 10));
  }

  setControls() {
    this.controls = {
      s: "down",
      w: "up",
      a: "left",
      d: "right",
    };
  }

  setCellY() {
    let sprites = {
      down: 0,
      up: 2,
      left: 3,
      right: 1,
      stopped: this.statusAux,
    };

    if (sprites[this.status] !== undefined) {
      if (sprites[this.status] == "stopped") {
        this.cellY = sprites[this.statusAux];
      } else {
        this.cellY = sprites[this.status];
        this.statusAux = sprites[this.status];
      }
    } else {
      this.cellY = sprites[this.status];
    }
  }

  move(areaLimitada, key) {
    const movements = {
      down: { x: this.x, y: this.y + this.speed },
      up: { x: this.x, y: this.y - this.speed },
      left: { x: this.x - this.speed, y: this.y },
      right: { x: this.x + this.speed, y: this.y },
      stopped: { x: this.x, y: this.y },
    };

    if (key != null && this.controls[key]) {
      this.status = this.controls[key];
    } else {
      this.status = "stopped";
    }

    this.x = movements[this.status].x;
    this.y = movements[this.status].y;

    this.updateHit();
    this.limits(areaLimitada);
  }

  shoot() {
    const bulletSpeed = 5;
    const bulletSize = 5;
    const bulletDirection = { x: 0, y: 0 };
    if (soundShoot) {
      soundShoot.play();
    }
    switch (this.statusAux) {
      case 0:
        bulletDirection.y = bulletSpeed;
        break;
      case 2:
        bulletDirection.y = -bulletSpeed;
        break;
      case 3:
        bulletDirection.x = -bulletSpeed;
        break;
      case 1:
        bulletDirection.x = bulletSpeed;
        break;
    }

    const bullet = new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      bulletSize,
      bulletSpeed,
      "rgba(0,100,255,.5)"
    );
    bullet.direction = bulletDirection;
    this.bullets.push(bullet);
  }

  updateBullets(boundaries) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.x += bullet.direction.x;
      bullet.y += bullet.direction.y;

      return (
        bullet.x > 0 &&
        bullet.x < boundaries.width &&
        bullet.y > 0 &&
        bullet.y < boundaries.height
      );
    });
  }

  limits(areaDoCanvas) {
    const offX = 60;
    const offY = 60;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.size + offX > areaDoCanvas.width) {
      this.x = areaDoCanvas.width - this.size - offX;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.size + offY > areaDoCanvas.height) {
      this.y = areaDoCanvas.height - this.size - offY;
    }
  }

  updateHit() {
    this.hit.x = this.x + this.width / 2;
    this.hit.y = this.y + this.height / 2;
  }

  colide(other) {
    return (
      this.hit.size + other.size >=
      Math.sqrt((this.hit.x - other.x) ** 2 + (this.hit.y - other.y) ** 2)
    );
  }
}
