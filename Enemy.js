import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

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
    imgUrl,
    FRAMES
  ) {
    super(x, y, size, speed);
    this.imgUrl = imgUrl;
    this.width = width;
    this.height = height;
    this.totalSprites = 6; // Número total de sprites na imagem
    this.spriteSpeed = 1;
    this.cellX = 0; // Controla o frame atual da animação
    this.cellY = 0; // Fixo, pois estamos lidando com uma coluna de sprites

    loadImage(this.imgUrl).then((img) => {
      this.img = img;
      this.cellWidth = img.naturalWidth; // Largura de cada sprite
      this.cellHeight = img.naturalHeight / this.totalSprites; // Altura de cada sprite
      console.log(
        "Sprite Width:" + this.cellWidth + " | Sprite Height:" + this.cellHeight
      );
    });

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

    this.animeSprite(FRAMES);
  }

  draw(CTX) {
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
      0, // X do recorte (fixo porque as sprites estão em uma única coluna)
      this.cellX * this.cellHeight, // Y do recorte (ajustado pelo frame atual)
      this.cellWidth, // Largura do recorte
      this.cellHeight, // Altura do recorte
      -this.width / 2, // Ajusta para o ponto de origem do objeto (centro)
      -this.height / 2, // Ajusta para o ponto de origem do objeto (centro)
      this.width, // Largura para desenhar no canvas
      this.height // Altura para desenhar no canvas
    );

    // Restaura o contexto ao estado original
    CTX.restore();

    //this.hit.draw(CTX); // Descomente para ver a área de hit
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
        if (this.y - this.size >= limits.height - 30) {
          this.y = -2 * this.size;
          this.x = Math.random() * limits.width;
        }
        break;

      case "up":
        if (this.y + this.size <= 30) {
          this.y = limits.height + this.size - 30;
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
    this.hit.x = this.x + this.width / 2;
    this.hit.y = this.y + this.height / 2;
  }
}
