# Chronicles of Eldoria

Chronicles of Eldoria é um jogo 2D desenvolvido em JavaScript utilizando Node.js, Vite e Anime.js. Este projeto inclui uma tela inicial animada e um efeito de "Loading..." enquanto os recursos do jogo estão sendo carregados.

# Deploy (Netlify)

```bash
https://chroniclesofeldoria.netlify.app/
```

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (geralmente incluído com o Node.js)

## Como Baixar e Usar

Siga estas etapas para configurar e executar o projeto localmente:

### 1. Clonar o Repositório

Clone o repositório do projeto para o seu computador.

```bash
git clone https://github.com/ricard00liveira/lpaw_2024.git
cd chronicles-of-eldoria
```

### 2. Instalar as Dependências

Instale as dependências do projeto usando npm.

```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento

Execute o servidor de desenvolvimento do Vite.

```bash
npm run dev
```

### 4. Abrir o Jogo no Navegador

Abra seu navegador e acesse a URL fornecida pelo Vite, geralmente:

```bash
http://localhost:3000
```

## Estrutura do Projeto

```bash
chronicles-of-eldoria/
│   .gitignore
│   Enemy.js
│   game.js
│   Hero.js
│   hud.js
│   index.html
│   init.js
│   keyboard.js
│   loaderAssets.js
│   main.js
│   model.js
│   package-lock.json
│   package.json
│   preload.js
│   README.md
│   structure.txt
│   three.html
│
├───assets
│   └───styles
│           MedievalSharp-Regular.ttf
│           styles.css
│
├───geometries
│       Circle.js
│       Quad.js
│       Rect.js
│       redCirc.js
│             package.json
│
└───public
    │   2k_earth_daymap.jpg
    │   background.webp
    │   book_menu.png
    │   dust.png
    │   earth1.obj
    │   fireball_game_shoot.png
    │   loading.webp
    │   sprite_char_transparente.png
    │   sprite_char_transparente2.png
    │
    ├───favicon
    │       android-chrome-192x192.png
    │       android-chrome-512x512.png
    │       apple-touch-icon.png
    │       favicon-16x16.png
    │       favicon-32x32.png
    │       favicon.ico
    │       site.webmanifest
    │
    └───sounds
            colide_cut.mp3
            collect_life.mp3
            gameover.mp3
            shoot.mp3
            theme.mp3
```
