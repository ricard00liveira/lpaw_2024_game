import { preload, imgMenu, imgHero, imgEnemy } from "./preload";
import { start } from "./game";

const init = async () => {
  await preload();
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  await document.fonts.load('48pt "MedievalSharp"').then(() => {
    context.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(0, 0, 0, 0.75)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "48px MedievalSharp";
    context.fillStyle = "gold";
    context.textAlign = "center";
    context.textBaseline = "middle";
    // Desenhar o texto no canvas
    context.fillText("Bem-vindo ao", canvas.width / 2, 115);
    context.font = "36px MedievalSharp";
    context.fillText("CHRONICLES OF ELDORIA", canvas.width / 2, 150);
    context.font = "24px MedievalSharp";
    context.fillStyle = "yellow";
    context.fillText("Instruções:", canvas.width / 2, 200);
    context.font = "18px MedievalSharp";
    context.fillText(
      "- Use as teclas W,S,A,D para mover o personagem.",
      canvas.width / 2,
      250
    );
    context.fillText(
      "- Fuja dos ataques dos inimigos (bolas de fogo).",
      canvas.width / 2,
      275
    );
    context.fillText(
      "- Ao decorrer do tempo o jogo ficará mais díficil:",
      canvas.width / 2,
      300
    );
    context.fillText("* Fogo com maior dano *", canvas.width / 2, 325);
    context.fillText("* Bolas de fogo mais rápidas *", canvas.width / 2, 350);
    context.fillText(
      "* Maior número de bolas de fogo *",
      canvas.width / 2,
      375
    );
    context.fillText(
      "- Pressione BARRA DE ESPAÇO para atirar e coletar vidas.",
      canvas.width / 2,
      400
    );
    context.fillStyle = "gold";
    context.font = "36px MedievalSharp";
    context.fillText("> INICIAR <", canvas.width / 2, 450);
  });
  canvas.addEventListener("click", function (event) {
    const buttonX = 317;
    const buttonY = 425;
    const buttonWidth = 200;
    const buttonHeight = 30;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + ", y: " + y);
    // Verificar se o clique está dentro do botão
    if (
      x > buttonX &&
      x < buttonX + buttonWidth &&
      y > buttonY &&
      y < buttonY + buttonHeight
    ) {
      start();
    }
  });
};

export { init };
