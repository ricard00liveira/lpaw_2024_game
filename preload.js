import { loadImage } from "./loaderAssets";
const preload = async () => {
  try {
    const backgroundImage = await loadImage("background.webp");
    document.querySelector(".loading").style.display = "none";
    document.body.style.backgroundImage = `url(${backgroundImage.src})`;
    document.body.style.backgroundColor = "transparent";
    startAnimations();
  } catch (error) {
    console.error("Error load backgroud image:", error);
  }

  function startAnimations() {
    document.querySelector(".game-title").style.display = "flex";
    // Primeira animação
    anime({
      targets: ".game-title",
      opacity: [0, 1],
      translateY: [-550, 0],
      duration: 2000,
      easing: "easeOutSine",
      complete: () => {
        // Segunda animação
        anime({
          targets: ".game-title",
          color: [
            { value: "#666", duration: 500, delay: 500 },
            { value: "#fff", duration: 1000 },
          ],
          backgroundColor: [
            { value: "#000", duration: 1000, delay: 500 },
            { value: "rgba(255, 255, 255, 0.2)", duration: 1000 },
          ],
          easing: "easeInOutSine",
          complete: () => {
            document.querySelector(".game-title").style.display = "none";
            document.querySelector(".game-footer").style.display = "flex";
            // Terceira animação
            anime({
              targets: ".game-footer",
              opacity: [0, 1],
              fontSize: ["72px", "20px"],
              duration: 3000,
              easing: "linear",
              complete: () => {
                document.querySelector(".game-container").style.display =
                  "flex";
                // Quarta animação
                anime({
                  targets: ".game-container",
                  opacity: [0, 1],
                  duration: 1000,
                  easing: "easeInBack",
                });
              },
            });
          },
        });
      },
    });
  }
};

export { preload };
