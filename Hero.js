import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Hero extends Circle {
  constructor(x, y, size, speed = 1, width, height, imgUrl, FRAMES) {
    super(x, y, size, speed);
    this.imgUrl = imgUrl;
    loadImage(this.imgUrl).then((img) => {
      this.img = img;
      this.cellWidth = img.naturalWidth / this.totalSprites + 0.5;
      console.log("W:" + this.cellWidth);
    });

    this.cellHeight = 51;
    this.cellX = 0;
    this.totalSprites = 3;
    this.spriteSpeed = 1;
    console.log("H:" + this.cellHeight);

    this.width = width;
    this.height = height;

    this.status = "stopped";
    this.statusAux = 0;
    this.isStopped = true;

    this.hit = new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.size,
      0,
      "rgba(0,0,255,.5)"
    );

    this.animeSprite(FRAMES);
    this.setControls();
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
    //descomentar para ver a area de hit
    //this.hit.draw(CTX);
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
      //x: "stopped",
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
    // this.cellY =
    //   sprites[this.status] !== undefined
    //     ? sprites[this.status]
    //     : sprites[this.status];
  }

  move(areaLimitada, key) {
    //console.log("Key: ", key);
    let movements = {
      down: {
        x: this.x,
        y: this.y + this.speed,
      },
      up: { x: this.x, y: this.y - this.speed },
      left: { x: this.x - this.speed, y: this.y },
      right: { x: this.x + this.speed, y: this.y },
      stopped: { x: this.x, y: this.y },
    };

    if (key != null) {
      if (this.controls[key]) {
        this.status = this.controls[key];
      } else {
        this.status = this.status;
      }
    } else {
      this.status = "stopped";
    }

    // this.status = this.controls[key] ? this.controls[key] : this.status;

    //console.log("Status: ", this.status, " - statusAux: ", this.statusAux); //Mostra this.status e this.statusAux;

    this.x = movements[this.status].x;
    this.y = movements[this.status].y;

    this.updateHit();
    this.limits(areaLimitada);
  }

  limits(areaDoCanvas) {
    let offX = 82;
    let offY = 85;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + (this.size + offX) > areaDoCanvas.width) {
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
