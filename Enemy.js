import Circle from "./geometries/Circle";
import { imgEnemy } from "./preload";

export default class Enemy extends Circle {
  constructor(
    x,
    y,
    limitX,
    limitY,
    size,
    speed = 5,
    id,
    width,
    height,
    FRAMES
  ) {
    super(x, y, size, speed);
    this.width = width;
    this.height = height;
    this.totalSprites = 6; // Número total de sprites na imagem
    this.spriteSpeed = 1;
    this.cellX = 0;
    this.cellY = 0;

    this.hit = new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.size,
      0,
      "rgba(0,0,255,.5)"
    );

    this.line = 1;
    this.id = id;

    const direcoes = ["down", "up", "left", "right"];
    this.direction = direcoes[Math.floor(Math.random() * direcoes.length)];
    switch (this.direction) {
      case "down":
        this.x = Math.random() * limitX;
        this.y = -2 + this.size;
        break;
      case "up":
        this.x = Math.random() * limitX;
        this.y = limitY + this.size - 30;
        break;
      case "left":
        this.x = limitX + this.size;
        this.y = Math.random() * (limitY - 30);
        break;
      case "right":
        this.x = -2 * this.size;
        this.y = Math.random() * (limitY - 30);
        break;
    }

    this.init(FRAMES); // Chama a função assíncrona para carregar a imagem
  }

  async init(FRAMES) {
    try {
      this.img = imgEnemy;
      this.cellWidth = this.img.naturalWidth; // Largura de cada sprite
      this.cellHeight = this.img.naturalHeight / this.totalSprites; // Altura de cada sprite
      //console.log(
      //  "Sprite Width:" + this.cellWidth + " | Sprite Height:" + this.cellHeight
      //);

      this.animeSprite(FRAMES); // Inicia a animação do sprite após o carregamento
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
    }
  }

  draw(CTX) {
    if (!this.img) {
      return; // Se a imagem ainda não foi carregada, sai do método
    }
    CTX.save();
    CTX.translate(this.x + this.width / 2, this.y + this.height / 2);

    // Rotaciona o contexto com base na direção
    switch (this.direction) {
      case "down":
        CTX.rotate(Math.PI / 2); // 90 graus horário
        break;
      case "up":
        CTX.rotate(-Math.PI / 2); // 90 graus anti-horário
        break;
      case "left":
        CTX.rotate(Math.PI); // 180 graus
        break;
      case "right":
        // Nenhuma rotação necessária
        break;
    }

    // Desenha a imagem, ajustando as coordenadas de acordo com a rotação
    CTX.drawImage(
      this.img,
      0,
      this.cellX * this.cellHeight,
      this.cellWidth,
      this.cellHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    CTX.restore();
    //this.hit.draw(CTX);
  }

  animeSprite(FRAMES) {
    setInterval(() => {
      this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
    }, 1000 / ((FRAMES * this.spriteSpeed) / 10));
  }

  move(limits) {
    switch (this.direction) {
      case "down":
        this.y += this.speed;
        break;
      case "up":
        this.y -= this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
    }
    this.limits(limits);
    this.updateHit();
  }

  limits(limits) {
    switch (this.direction) {
      case "down":
        if (this.y - this.size >= limits.height - 50) {
          this.y = -2 * this.size;
          this.x = Math.random() * limits.width;
        }
        break;

      case "up":
        if (this.y + this.size <= 30) {
          this.y = limits.height - 30;
          this.x = Math.random() * limits.width;
        }
        break;

      case "left":
        if (this.x + this.size <= 30) {
          this.x = limits.width + this.size;
          this.y = Math.random() * (limits.height - 30);
        }
        break;

      case "right":
        if (this.x - this.size >= limits.width - 30) {
          this.x = -2 * this.size;
          this.y = Math.random() * (limits.height - 30);
        }
        break;
    }
  }

  updateHit() {
    switch (this.direction) {
      case "down":
        this.hit.x = this.x + this.width / 2;
        this.hit.y = this.y + this.height / 2 + 30;
        break;
      case "up":
        this.hit.x = this.x + this.width / 2;
        this.hit.y = this.y + this.height / 2 - 30;
        break;
      case "left":
        this.hit.x = this.x + this.width / 2 - 30;
        this.hit.y = this.y + this.height / 2;
        break;
      case "right":
        this.hit.x = this.x + this.width / 2 + 30;
        this.hit.y = this.y + this.height / 2;
        break;
      default:
        this.hit.x = this.x + this.width / 2;
        this.hit.y = this.y + this.height / 2;
        break;
    }
  }
  colide(other) {
    return (
      this.hit.size + other.size >=
      Math.sqrt((this.hit.x - other.x) ** 2 + (this.hit.y - other.y) ** 2)
    );
  }
}
