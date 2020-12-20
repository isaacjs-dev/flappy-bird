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
    speed:0,
    update() {
        flappyBird.speed = flappyBird.speed + flappyBird.gravity
        flappyBird.drawY = flappyBird.drawY + flappyBird.speed;
    },
    draw() {
        contexto.drawImage(
            sprites,
            flappyBird.sourceX, flappyBird.sourceY,
            flappyBird.sourceWidth, flappyBird.sourceHeight,
            flappyBird.drawX, flappyBird.drawY,
            flappyBird.drawWidth, flappyBird.drawHeight
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
            floor.sourceX, floor.sourceY,
            floor.sourceWidth, floor.sourceHeight,
            floor.drawX, floor.drawY,
            floor.drawWidth, floor.drawHeight
        )

        contexto.drawImage(
            sprites,
            floor.sourceX, floor.sourceY,
            floor.sourceWidth, floor.sourceHeight,
            floor.drawX + floor.drawWidth, floor.drawY,
            floor.drawWidth, floor.drawHeight
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
        contexto.fillRect(0,0, canvas.width, canvas.height);
        
        contexto.drawImage(
            sprites,
            bgGamer.sourceX, bgGamer.sourceY,
            bgGamer.sourceWidth, bgGamer.sourceHeight,
            bgGamer.drawX, bgGamer.drawY,
            bgGamer.drawWidth, bgGamer.drawHeight
        )

        contexto.drawImage(
            sprites,
            bgGamer.sourceX, bgGamer.sourceY,
            bgGamer.sourceWidth, bgGamer.sourceHeight,
            (bgGamer.drawX + bgGamer.drawWidth), bgGamer.drawY,
            bgGamer.drawWidth, bgGamer.drawHeight
        )
    }
}

function loop() {
    flappyBird.update();

    bgGamer.draw();
    floor.draw();
    flappyBird.draw();
    
    requestAnimationFrame(loop);
}

loop();
