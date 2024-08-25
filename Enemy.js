import Circle from "./geometries/Circle";

export default class Enemy extends Circle {
  constructor(x, y, limitX, limitY, size, speed = 5, color = "#00f", id) {
    super(x, y, size, speed, color);
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
}
