import { loadImage } from "./loaderAssets";
import { loadAudio } from "./loaderAssets";

let soundTheme, soundShoot, soundGameOver, soundColide, soundCollect; // Sons
let imgBackground, imgMenu, imgEnemy, imgHero, imgCenario; // Imagens

const preload = async () => {
  try {
    console.groupCollapsed("Carregamento de Assets");
    const assets = await Promise.all([
      loadImage("/background.webp"),
      loadImage("/book_menu.png"),
      loadImage("/fireball_game_shoot.png"),
      loadImage("/sprite_char_transparente.png"),
      loadImage("/dust.png"),
      loadAudio("/sounds/colide_cut.mp3"),
      loadAudio("/sounds/collect_life.mp3"),
      loadAudio("/sounds/gameover.mp3"),
      loadAudio("/sounds/shoot.mp3"),
      loadAudio("/sounds/theme.mp3"),
    ]);
    console.groupEnd();

    const [
      loadedBackgroundImage,
      loadedImgMenu,
      loadedImgEnemy,
      loadedImgHero,
      loadedImgCenario,
      loadedSoundColide,
      loadedSoundCollect,
      loadedSoundGameOver,
      loadedSoundShoot,
      loadedSoundTheme,
    ] = assets;

    // Atribuição das imagens carregadas
    imgBackground = loadedBackgroundImage;
    imgMenu = loadedImgMenu;
    imgEnemy = loadedImgEnemy;
    imgHero = loadedImgHero;
    imgCenario = loadedImgCenario;

    // Atribuição dos sons carregados
    soundColide = loadedSoundColide;
    soundCollect = loadedSoundCollect;
    soundGameOver = loadedSoundGameOver;
    soundShoot = loadedSoundShoot;
    soundTheme = loadedSoundTheme;

    // Esconde a tela de carregamento e ajusta o background do corpo
    document.querySelector(".loading").style.display = "none";
    document.body.style.backgroundImage = `url(${imgBackground.src})`;
    document.body.style.backgroundColor = "transparent";

    // Inicia as animações
    startAnimations();

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
                    complete: () => {
                      document.getElementById("modelContainer").style.display =
                        "none";
                    },
                  });
                },
              });
            },
          });
        },
      });

      // Inicia o som tema
      soundTheme.volume = 0.005;
      soundTheme.play();
    }
  } catch (error) {
    console.error("Error loading assets:", error);
  }
};

// Exporta todas as variáveis para uso em outros módulos
export {
  preload,
  soundTheme,
  soundShoot,
  soundGameOver,
  soundColide,
  soundCollect,
  imgBackground,
  imgMenu,
  imgEnemy,
  imgHero,
  imgCenario,
};
// Exporte os sons para uso em outras partes do jogo
