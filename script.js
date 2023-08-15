const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio('./audio/audio.mp3')

const size = 30

const incrementScore = () =>{
    score.innerText = +score.innerText + 10
}

let snake = [
    {x: 270, y: 240}
   
    
    
]
const ramdomNumber = (min, max) =>{
    return Math.round(Math.random()* (max - min) + min)
}
const randomPosition = () => {
    const number = ramdomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}
const ramdomColor = () => {
    const red = ramdomNumber(0,255)
    const green = ramdomNumber(0,255)
    const blue = ramdomNumber(0,255)

    return `rgb(${red},${green},${blue})`
}
const food = {
    x : randomPosition(),
    y : randomPosition(),
    color:ramdomColor()
}
const drawfood =() =>{
    const { x, y, color} = food 

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x,y,size,size)
    ctx.shadowBlur = 0
}
const checkEat = () => {
    const head =snake[snake.length-1]
    if(head.x == food.x && head.y == food.y){
        incrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while(snake.find((position)=> position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }
        food.x = x
        food.y = y
        food.color = ramdomColor()
    }
}

let direction, loopid 
const drawSnake = () => {
    ctx.fillStyle = "#C13EF0"


    snake.forEach((position, index) => {
        if
            (index == snake.length - 1){
                ctx.fillStyle = "#78A31A"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}
const moveSnake = ()=>{
    if(!direction) return
    const head = snake[snake.length - 1]
    
    if(direction =="right"){
        snake.push({x: head.x + size, y: head.y})
    }
    if(direction =="left"){
        snake.push({x: head.x - size, y: head.y})
    }
    if(direction =="down"){
        snake.push({x: head.x, y: head.y + size})
    }
    if(direction =="up"){
        snake.push({x: head.x, y: head.y - size})
    }
    snake.shift()
}
const checkColission = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size 
    const neckindex = snake.length - 2

    const wallColission = 
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfColission = snake.find((position,index) => {
        return index < neckindex && position.x == head.x && position.y == head.y
    })

    if(wallColission || selfColission){
        gameOver()
    }
}
const gameOver = () =>{
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
}
const gameLoop = () =>{
    clearInterval(loopid)
    ctx.clearRect(0,0,600,600)

    
    drawfood()
    moveSnake()
    drawSnake()
    checkEat()
    checkColission()
    loopid = setTimeout(()=>{
        gameLoop()
    },300)

}

gameLoop()

document.addEventListener("keydown",({key})=>{
    if(key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
    if(key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    if(key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
    if(key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

})
buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = {x: 270, y: 240}

})

