console.log('http://127.0.0.1:5500/index.html');

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

const flappyBird = {
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
    update() {
        this.speed = this.speed + this.gravity
        this.drawY = this.drawY + this.speed;
    },
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

const floor = {
    sourceX: 0,
    sourceY: 610,
    sourceWidth: 224,
    sourceHeight: 112,
    drawX: 0,
    drawY: canvas.height - 112,
    drawWidth: 224,
    drawHeight: 112,
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
}

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
        draw() {
            screens.GAME.draw()
            mensagemGetReady.draw()
        },
        update() {

        },
        click() {
            screens.screenRoute(screens.GAME);
        }
    },
    GAME: {
        draw() {
            bgGamer.draw();
            floor.draw();
            flappyBird.draw();
        },
        update() {
            flappyBird.update();
        },
        click() {
            false;
        }
    },
    screenRoute(screen) {
        this.ative = screen
    }
}


function loop() {
    screens.ative.draw();
    screens.ative.update();
    requestAnimationFrame(loop);
}

(function(){
    window.addEventListener('click', () => {
        screens.ative.click() ?? screens.ative.click() 
    });

    screens.screenRoute(screens.HOME);
    loop();
})()