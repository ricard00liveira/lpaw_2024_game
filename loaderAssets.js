const loadImage = async (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      console.log("Imagem carregada: " + url);
      resolve(img);
    });
    img.addEventListener("error", (error) => {
      console.error("Erro ao carregar a imagem: " + url, error);
      reject(error);
    });
    img.src = url;
    console.log("Carregando imagem: " + url);
  });

const loadAudio = async (path) => {
  return new Promise((resolve, reject) => {
    const timeoutDuration = 30000; // 30 segundos
    const audio = new Audio(path);
    console.log("Carregando áudio:" + path);

    const onCanPlay = () => {
      console.log("Áudio carregado: " + path);
      clearTimeout(timeout);
      resolve(audio);
    };

    const onError = (error) => {
      console.error("Erro ao carregar o áudio: " + path, error);
      clearTimeout(timeout);
      reject(new Error(`Falha ao carregar o áudio: ${path}`));
    };

    const timeout = setTimeout(() => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      reject(
        new Error(
          `O carregamento do áudio ultrapassou ${timeoutDuration} milissegundos: ${path}`
        )
      );
    }, timeoutDuration);

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
  });
};

export { loadImage, loadAudio };
