function init() {
  //Dom Elements
  const grid = document.querySelector('.grid')
  const scoreCard = document.querySelector('#score')
  const cells = []

  //Grid Variables
  const height = 15
  const width = 15

  //Points Increment Variables
  const jumpPoints = 10

  //Character Sprite Variables
  let x = 7
  let y = 14
  let scoreTally = 0
  let furthestJump = 0

  //Obstacle Sprite Variables
  let lineThirteenLead = 0


  //Functions

  //Adding Event Listeners

  // Creates individual grid cells then fires initial Character sprite positioning

  function createCells() {
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cell.textContent = `${i}-${j}`
        row.push(cell)
      }
      cells.push(row)
    }
    console.log(cells)
    goSprite('start')
  }
  // TODO: This needs refactoring. Probably move the UDLR arguments into the onkey function and make a single 'Move' Function.
  // TODO: goSprite Function needs re-factoring to be more efficient
  //* This Section deals with the movement of the sprite and human input from the keyboard
  // Adds and removes CSS Classes to the individual squares
  // TODO: make dog turn on key down instead of key up and add animation of legs

  function goSprite(direction) {
    // console.log(`sprite went ${direction}`)
    if (direction === 'start') {
      cells[y][x].classList.add('sprite')
    }
    if (direction === 'U' && y !== 0) {
      // console.log('move up')
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      y--
      cells[y][x].classList.add('sprite')
      cells[y][x].style.backgroundImage = 'url(./assets/pupper_spr_fwd.png)'
    } else if (direction === 'D' && y !== 14) {
      // console.log('move down')
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      y++
      cells[y][x].classList.add('sprite')
      cells[y][x].style.backgroundImage = 'url(./assets/pupper_spr_bwd.png)'
    } else if (direction === 'L' && x !== 0) {
      // console.log('move left')
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      x--
      cells[y][x].classList.add('sprite')
      cells[y][x].style.backgroundImage = 'url(./assets/pupper_spr_left.png)'
    } else if (direction === 'R' && x !== width - 1) {
      // console.log('move right')
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      x++
      cells[y][x].classList.add('sprite')
      cells[y][x].style.backgroundImage = 'url(./assets/pupper_spr_right.png)'
    }
  }
  //Function chains to go on Key Presses
  function moveUp() {
    goSprite('U')
    scoreIncrease()
  }
  function moveDown() {
    goSprite('D')
  }
  function moveLeft() {
    goSprite('L')
  }
  function moveRight() {
    goSprite('R')
  }


  // gets player 1's key presses from Arrow key Dpad
  window.onkeyup = function (event) {
    switch (event.keyCode) {
      case 37:
        moveLeft()
        break
      case 38:
        moveUp()
        break
      case 39:
        moveRight()
        break
      case 40:
        moveDown()
        break
    }
  }


  // Increments the furthest jump variable only if the sprite is advancing further than it has previously
  // Also increments score variable by Jump Points and pushes score to score span in HTML
  // ? Was a challenge to work out as I wanted to keep true to the original scoring system 
  function scoreIncrease() {
    if (height - y - 1 > furthestJump) {
      furthestJump++
      scoreTally += jumpPoints
      scoreCard.textContent = scoreTally
    }
  }
  createCells() //TODO <==== Remove this and initiate on click of start button

  //* Deals with obstical Movement


  function advanceObstical() {
    cells[13][lineThirteenLead].style.backgroundColor = ''
    if (lineThirteenLead < width - 1){
      lineThirteenLead++
    } else {
      lineThirteenLead = 0
    }
    cells[13][lineThirteenLead].style.backgroundColor = 'red'
  }
  


  setInterval(advanceObstical, 1000)


}
window.addEventListener('DOMContentLoaded', init)