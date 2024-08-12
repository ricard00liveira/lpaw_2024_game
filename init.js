import { loadImage } from "./loaderAssets";
import { preload } from "./preload";
import { game } from "./game";

const init = async () => {
  document.body.style.backgroundColor = "#000000";
  document.querySelector(".loading").style.color = "#FFFFFF";
  //await preload();
  document.querySelector(".game-title").style.display = "none";
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".game-footer").style.display = "none";
  document.querySelector(".game-container").style.display = "flex";
  game();
  //   startLoadingAnimation();

  // const canvas = document.getElementById("gameCanvas");
  // const context = canvas.getContext("2d");

  // context.fillStyle = "black";
  // context.fillRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = "white";
  // context.font = "20px Arial";
  // context.fillText("Loading", 250, 200);

  //   function startLoadingAnimation() {
  //     let loadingText = "Loading";
  //     let dotCount = 0;
  //     setInterval(() => {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //       context.fillStyle = "black";
  //       context.fillRect(0, 0, canvas.width, canvas.height);
  //       context.fillStyle = "white";
  //       context.font = "20px Arial";
  //       context.fillText(loadingText + ".".repeat(dotCount), 250, 200);
  //       dotCount = (dotCount + 1) % 4;
  //     }, 500);
  //   }
};

export { init };
