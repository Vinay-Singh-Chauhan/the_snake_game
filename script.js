canvas = document.getElementById("canvas");
pen = canvas.getContext('2d');
w = h = 700;
canvas.width = w;
canvas.height = h;
cell_size = 30;
game = false;
lasty = Math.round(h / cell_size);
lastx = Math.round(w / cell_size);
score = 0;
time = 0;
go = document.getElementsByClassName("gameover")[0];
pausebool = false;
snake = {
    color: "yellow",
    initial_size: 5,
    cells: [],
    direction: "down",
    initSnake: function () {
        this.direction = "down";
        this.cells = [];
        for (let i = 0; i < this.initial_size; i++) {
            this.cells.push({ x: i, y: 0 });
        }


    },
    drawSnake: function () {
        pen.fillStyle = this.color;
        // console.log(this.cells);
        for (let i = 0; i < this.cells.length; i++) {
            pen.fillRect(this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size, cell_size);
        }

    },
    updateSnake: function () {
        newx = 0, newy = 0;
        dx=0,dy=0;
        if (this.direction == "right") {
            dx = 1;
        }
        if (this.direction == "left") {
            dx = - 1;

        }
        if (this.direction == "down") {
            dy = 1;
        }
        if (this.direction == "up") {
            dy = - 1;
        }
        newx=this.cells[this.cells.length - 1].x+ dx;
        newy=this.cells[this.cells.length - 1].y+dy;
        if (food.x == newx && food.y == newy) {
            // pen.clearRect()
            score++;
            food = getFood();

        } else {

            this.cells.shift();
        }
        this.cells.forEach(e => {
            if (e.x == newx && e.y == newy) {
                console.log("gameOver");
                game = false;
            }
        });

        if (newx * cell_size > w) newx = 0;
        if (newx < 0) newx = lastx;
        if (newy * cell_size > h) newy = 0;
        if (newy < 0) newy = lasty;
        this.cells.push({ x: newx, y: newy });

    },
    changeDirection: function (e) {

        // console.log(e);
        if (e == "ArrowDown" && this.direction != 'up') {
            this.direction = "down";
        }
        if (e == "ArrowUp" && this.direction != 'down') {
            this.direction = "up";
        }
        if (e == "ArrowRight" && this.direction != 'left') {
            this.direction = "right";
        }
        if (e == "ArrowLeft" && this.direction != 'right') {
            this.direction = "left";
        }
    }
}
food_img = new Image();
food_img.src = "assets/food.png";
snake_img = new Image();
snake_img.src = "assets/snake.png"
function getFood() {
    b = Math.round((Math.random() * (h - cell_size)) / cell_size);
    a = Math.round((Math.random() * (w - cell_size)) / cell_size);
    console.log(a, b);
    return { x: a, y: b };
}

function init() {
    time = 0;
    score = 0;
    game = true;
    pausebool = false;
    document.addEventListener("keydown", (e) => {
        snake.changeDirection(e.key)
    });
    go.style.setProperty("visibility", "hidden");
    snake.initSnake();
    food = getFood();
    tid = setInterval(() => {
        t.innerHTML = `Time Elapsed: ${time} seconds`;
        time++;
    }, 1000);


}
function draw() {
    pen.clearRect(0, 0, w, h);
    snake.drawSnake();
    pen.fillStyle = "yellow";
    pen.drawImage(food_img, food.x * cell_size, food.y * cell_size, cell_size - 2, cell_size - 2);


}
function update() {
    sc.innerHTML = score;

    snake.updateSnake();
}
function gameloop() {
    draw();
    update();
    if (pausebool) {
        clearInterval(gid);
        clearInterval(tid);
    }
    if (game == false) {
        clearInterval(gid);
        clearInterval(tid);
        go.style.setProperty("visibility", "visible");
    }
}

sc = document.getElementById("score");
sc.innerHTML = "0"
t = document.getElementById("time");
t.innerHTML = "Time Elapsed: 0 seconds"
pause = document.getElementById("pausebtn");
start = document.getElementById("playbtn");
pause.addEventListener('click', () => {
    if (!pausebool) {
        if (game) {
            pausebool = true;
            pause.innerHTML = "Resume";
        }

    }
    else {
        if (game) {
            pausebool = false;
            gid = setInterval(gameloop, 100);
            tid = setInterval(() => {
                t.innerHTML = `Time Elapsed: ${time} seconds`;
                time++;
            }, 1000);
            pause.innerHTML = "Pause";
        }

    }

})
start.addEventListener('click', () => {
    if (!game && time == 0) {
        game = true;
        init();
        gid = setInterval(gameloop, 100);
        start.innerHTML = "Reset Game";
    }
    else {
        score = 0;
        time = 0;
        clearInterval(gid);
        clearInterval(tid);
        sc.innerHTML = "0"
        t.innerHTML = "Time Elapsed: 0 seconds"
        pen.clearRect(0, 0, w, h);
        game = false;
        go.style.setProperty("visibility", "hidden");

        start.innerHTML = "Start Game";
    }

})

