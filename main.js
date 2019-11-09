// тут может находится ваш код
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var rects = [];
var btnStart = document.querySelector("#start");
var btnStop = document.querySelector("#stop");
var score = document.querySelector('#score');
var lives = document.querySelector('#lives');
var scoreNumber = 0;
var livesNumber = 7;
var timerId;
var randomInterval = Math.round(Math.random() * (777 - 500)) + 500;
var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

function stopGame(){
  clearInterval(timerId);
  timerId = undefined;
  rects = [];
  scoreNumber = 0;
  livesNumber = 7;
  score.innerHTML = `${scoreNumber}`;
  lives.innerHTML = `${livesNumber}`;
}

btnStart.addEventListener("click", function(){
  if (!timerId) {
      timerId = setInterval(() => {
        rects.push(new MakeRect());
        rects.forEach((item, index, arr) => {
          if (item.y > canvas.height) {
            livesNumber--;
            lives.innerHTML = `${livesNumber}`;
            arr.splice(index, 1);
          }
        });
        if (livesNumber <= 0) {
          stopGame();
          alert("U lost, dude...If u wanna try another one, u know what u should do!");
        }
    }, randomInterval);
  }
});

btnStop.addEventListener("click", stopGame);

canvas.addEventListener('click', function(event) {
  var x = event.pageX - canvasLeft,
      y = event.pageY - canvasTop;
  rects.forEach(function(item, index) {
      if (+item.x + 40 >= x && +item.x - 40 <= x && +item.y + 40 >= y && +item.y - 40 <= y) {
          console.log(item);
          rects.splice(index, 1);
          console.log("killed a rect");
          scoreNumber++;
          score.innerHTML = `${scoreNumber}`;
      }
  });
}, false);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function MakeRect() {
  this.x = (Math.random() * canvas.width - 40).toFixed(0);
  if (this.x < 0 || this.x > canvas.width) this.x = 0;
  this.y = 0;
  this.color = getRandomColor();
  this.ySpeed = Math.floor(Math.random() * 5) || 1;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  rects.forEach(item => {
    ctx.beginPath();
    ctx.fillRect(item.x, item.y, 40, 40);
    ctx.fillStyle = '' + item.color;
    ctx.fill();
    ctx.closePath();
  });
}

function animate() {
  clearCanvas();
  draw();
  rects.forEach(item => {
    item.y += item.ySpeed;
  });
  // тут может находится ваш код
  requestAnimationFrame(animate);
}
// тут может находится ваш код

document.body.onload = animate;
