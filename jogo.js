const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

const soundHIT = new Audio();
soundHIT.src = './sound/hit.wav';

const globals = {
    frames: 0,
}

const flappyBird = () => ({
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 33,
    sourceHeight: 24,
    drawX: 10,
    drawY: 50,
    drawWidth: 33,
    drawHeight: 24,
    gravity: 0.25,
    speed: 0,
    skip: 4.6,
    currentFrame: 0,
    movement: [
        { sourceX: 0, sourceY: 0 },
        { sourceX: 0, sourceY: 26 },
        { sourceX: 0, sourceY: 52 }
    ],
    setFrameCurrent() {
        const frameInterval = 10
        const passedBreak = globals.frames % frameInterval === 0;

        if (passedBreak) {
            const incrementBase = 1;
            const increment = incrementBase + this.currentFrame;
            const numOfRepet = this.movement.length;
            this.currentFrame = increment % numOfRepet
        }
    },
    jump() {
        this.speed = - this.skip;
    },
    update() {
        if (collided(globals.flappyBird, globals.floor)) {
            soundHIT.play()
            setTimeout(() => {
                screens.screenRoute(screens.HOME);
            }, 500)
            return;
        }
        this.speed = this.speed + this.gravity
        this.drawY = this.drawY + this.speed;
    },
    draw() {
        this.setFrameCurrent();
        const { sourceX, sourceY } = this.movement[this.currentFrame]
        contexto.drawImage(
            sprites,
            sourceX, sourceY,
            this.sourceWidth, this.sourceHeight,
            this.drawX, this.drawY,
            this.drawWidth, this.drawHeight
        )
    }
})

const createTubes = () => ({
    sourceWidth: 52,
    sourceHeight: 400,
    drawWidth: 52,
    drawHeight: 400,
    pairOfTubes: [],

    CollidedBird(pairOfTube) {
        const birdTop = globals.flappyBird.drawY;
        const birdBottom = globals.flappyBird.drawY + globals.flappyBird.drawHeight;

        if (globals.flappyBird.drawX >= pairOfTube.drawX) {
            if (birdTop <= pairOfTube.top.drawY + this.sourceHeight) {
                return true;
            }

            if (birdBottom >= pairOfTube.bottom.drawY) {
                return true;
            }


        }
        return false;
    },

    update() {
        drawNewtudo = globals.frames % 100 === 0;

        if (drawNewtudo) {
            this.pairOfTubes.push({
                drawX: canvas.width,
                drawY: -150 * (Math.random() + 1),
            })
        }

        this.pairOfTubes.forEach((pairOfTube) => {
            pairOfTube.drawX = pairOfTube.drawX - 2;

            if (this.CollidedBird(pairOfTube)) {
                screens.screenRoute(screens.HOME);
            }

            if (pairOfTube.drawX + this.sourceWidth <= -1) {
                this.pairOfTubes.shift();
            }
        }

        )

    },

    draw() {
        this.pairOfTubes.forEach((pairOfTube) => {
            const spaceTubesBetween = 90;
            const drawYRondom = pairOfTube.drawY;

            pairOfTube.top = {
                sourceX: 52,
                sourceY: 169,
                drawX: pairOfTube.drawX,
                drawY: drawYRondom,
            }

            pairOfTube.bottom = {
                sourceX: 0,
                sourceY: 169,
                drawX: pairOfTube.drawX,
                drawY: this.sourceHeight + spaceTubesBetween + drawYRondom,
            }


            contexto.drawImage(
                sprites,
                pairOfTube.top.sourceX, pairOfTube.top.sourceY,
                this.sourceWidth, this.sourceHeight,
                pairOfTube.top.drawX, pairOfTube.top.drawY,
                this.drawWidth, this.drawHeight
            )

            contexto.drawImage(
                sprites,
                pairOfTube.bottom.sourceX, pairOfTube.bottom.sourceY,
                this.sourceWidth, this.sourceHeight,
                pairOfTube.bottom.drawX, pairOfTube.bottom.drawY,
                this.drawWidth, this.drawHeight
            )
        })
    }
})

const gameFloor = () => ({
    sourceX: 0,
    sourceY: 610,
    sourceWidth: 224,
    sourceHeight: 112,
    drawX: 0,
    drawY: canvas.height - 112,
    drawWidth: 224,
    drawHeight: 112,
    update() {
        const moveFloor = 1;
        const repeatIn = this.sourceWidth / 2;
        const moved = this.drawX - moveFloor;

        this.drawX = moved % repeatIn;
    },
    draw() {
        contexto.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.sourceWidth, this.sourceHeight,
            this.drawX, this.drawY,
            this.drawWidth, this.drawHeight
        )

        contexto.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.sourceWidth, this.sourceHeight,
            this.drawX + this.drawWidth, this.drawY,
            this.drawWidth, this.drawHeight
        )
    }
})



const bgGamer = {
    sourceX: 390,
    sourceY: 0,
    sourceWidth: 275,
    sourceHeight: 204,
    drawX: 0,
    drawY: canvas.height - 204,
    drawWidth: 275,
    drawHeight: 204,
    draw() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.sourceWidth, this.sourceHeight,
            this.drawX, this.drawY,
            this.drawWidth, this.drawHeight
        )

        contexto.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.sourceWidth, this.sourceHeight,
            (this.drawX + this.drawWidth), this.drawY,
            this.drawWidth, this.drawHeight
        )
    }
}

// Mensagem Get Ready
const mensagemGetReady = {
    sourceX: 134,
    sourceY: 0,
    sourceWidth: 174,
    sourceHeight: 152,
    drawX: (canvas.width / 2) - (174 / 2),
    drawY: 90,
    drawWidth: 174,
    drawHeight: 152,
    draw() {
        contexto.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.sourceWidth, this.sourceHeight,
            this.drawX, this.drawY,
            this.drawWidth, this.drawHeight
        )
    }
}

//
// Telas
//

const screens = {
    ative: {},
    HOME: {
        init() {
            globals.flappyBird = flappyBird();
            globals.floor = gameFloor();
            globals.tubes = createTubes();

        },
        draw() {
            bgGamer.draw();
            globals.flappyBird.draw();
            globals.floor.draw();
            mensagemGetReady.draw();
        },
        update() {
            globals.floor.update();
        },
        click() {
            screens.screenRoute(screens.GAME);
        }
    },
    GAME: {
        draw() {
            bgGamer.draw();
            globals.flappyBird.draw();
            globals.tubes.draw();
            globals.floor.draw();
        },
        update() {
            globals.flappyBird.update();
            globals.floor.update();
            globals.tubes.update();
        },
        click() {
            globals.flappyBird.jump();
        }
    },
    screenRoute(screen) {
        this.ative = screen
        if (screen.init) screen.init();

    }
}

const collided = (flappyBird, gameFloor) => flappyBird.drawY + flappyBird.sourceHeight >= gameFloor.drawY

function loop() {
    screens.ative.draw();
    screens.ative.update();

    globals.frames = globals.frames + 1;
    requestAnimationFrame(loop);
}

(function () {
    window.addEventListener('click', () => {
        if (screens.ative.click) screens.ative.click()
    });

    screens.screenRoute(screens.HOME);

    loop();
})()