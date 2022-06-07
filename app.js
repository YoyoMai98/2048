document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const btn = document.getElementById('btn')

    const width = 4
    let squares = []
    let score = 0

    // create a board
    function createBoard() {
        for(let i=0; i<width; i++){
            for(let c=0; c<width; c++){
                let square = document.createElement('div')
                square.id = i.toString() + "-" + c.toString()
                square.innerHTML = 0
                gridDisplay.appendChild(square)
                squares.push(square)
            }
        }
        generateNumber()
        generateNumber()
    }
    createBoard()

    // generate a number randomly
    function generateNumber() {
        let randomNumber = Math.floor(Math.random()*squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
            updateColor()
            checkForLose()
        }else generateNumber()
    }

    function updateColor() {
        for(let i=0; i<squares.length; i++){
            squares[i].classList.value = ""
            let num = squares[i].innerHTML
            squares[i].classList.add("x"+num.toString())
        }
    }

    // swipe right
    function moveRight() {
        for(let i=0; i<width*width; i++){
            if(i % width === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = width-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    // swipe left
    function moveLeft() {
        for(let i=0; i<width*width; i++){
            if(i % width === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = width-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    
    // swipe down
    function moveDown() {
        for(let i=0; i<width; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = width-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    // swipe up
    function moveUp() {
        for(let i=0; i<width; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = width-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    // Combine row/column
    function combineRow() {
        for(let i=0; i<width*width-1; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for(let i=0; i<width*width-width; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    // Assign keycodes
    function control(e) {
        if(e.keyCode === 39){
            keyRight()
        }else if(e.keyCode === 37){
            keyLeft()
        }else if(e.keyCode === 38){
            keyUp()
        }else if(e.keyCode === 40){
            keyDown()
        }
    }
    document.addEventListener('keyup',control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generateNumber()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generateNumber()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generateNumber()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generateNumber()
    }

    // check the result
    function checkForWin() {
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Won!'
                document.removeEventListener('keyup',control)
            }
        }
    }

    function checkForLose() {
        let zeroNum = 0
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML == 0) {
                zeroNum++
            }
        }
        if(zeroNum === 0){
            resultDisplay.innerHTML = 'You Lost!'
            document.removeEventListener('keyup',control)
        }
    }

    // reset the game
    btn.onclick = function () {
        score = 0
        reset()
        scoreDisplay.innerHTML = score
        resultDisplay.innerHTML = ''
    }

    function reset() {
        for(let i=0; i<width*width; i++){
            squares[i].innerHTML = 0
        }
        generateNumber()
        generateNumber()
        document.addEventListener('keyup',control)
    }
})