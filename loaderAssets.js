const loadImage = async (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      console.log("loaded: " + url);
      return resolve(img);
    });
    img.src = url;
    //console.log("loading img: " + url);
  });

const loadAudio = async (path) => {
  return new Promise((resolve, reject) => {
    const timeoutDuration = 5000;
    const audio = new Audio(path);
    console.log("Loading audio...");

    const onCanPlay = () => {
      console.log("Audio loaded: " + path);
      clearTimeout(timeout);
      resolve(audio);
    };

    const timeout = setTimeout(() => {
      audio.removeEventListener("canplay", onCanPlay);
      reject(
        new Error(
          `Áudio demorou mais que ${timeoutDuration} milisegundos. ERRO!`
        )
      );
    }, timeoutDuration);

    audio.addEventListener("canplay", onCanPlay);
  });
};

export { loadImage, loadAudio };
