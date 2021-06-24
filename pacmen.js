const pacmanImages = [
  ['images/pacman1.png', 'images/pacman2.png'],
  ['images/pacman3.png', 'images/pacman4.png'],
];

let lastPacmanId = 0;
const pacmen = [];

const setToRandom = (scale) => {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

const addPacman = () => {
  const velocity = setToRandom(10);
  const position = setToRandom(200);

  const game = document.getElementById('game');
  const newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacmanImages[0][0];
  newimg.width = (Math.random() * 50) + 50;

  const id = lastPacmanId;
  lastPacmanId++;

  newimg.onclick = () => {
    game.removeChild(newimg);
    pacmen.splice(pacmen.findIndex(value => value.id == id), 1);
  }
  
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);

  pacmen.push({
    id,
    position,
    velocity,
    newimg,
    mouthImageIndex: 0
  });
}

const checkCollisions = (item) => {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
      )
    item.velocity.x = -item.velocity.x;

  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) 
    item.velocity.y = -item.velocity.y; 
}

const updatePositions = () => {
  pacmen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    if (item.velocity.x < 0) {
      item.newimg.src = pacmanImages[1][item.mouthImageIndex];
    } else {
      item.newimg.src = pacmanImages[0][item.mouthImageIndex];
    }

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
}

const animateMouths = () => {
  pacmen.forEach((item) => {
    if (item.mouthImageIndex === 0) {
      item.mouthImageIndex = 1;
    } else {
      item.mouthImageIndex = 0;
    }
  });
}

let updateInterval;
let animationInterval;
let started = false;

const start = () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  if (animationInterval) {
    clearInterval(animationInterval);
  }

  updateInterval = setInterval(updatePositions, 20);
  animationInterval = setInterval(animateMouths, 150);

  started = true;
}

const stop = () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  if (animationInterval) {
    clearInterval(animationInterval);
  }

  started = false;
}

document.getElementById('addpacman').onclick = () => {
  addPacman();
}

document.getElementById('start').onclick = () => {
  if (!started) {
    start();
  } else {
    stop();
  }
}