function init() {
  //Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  //Grid Variables
  const height = 15
  const width = 15

  //Score Variables
  const jumpPoints = 10

  //Sprite Variables
  let x = 7
  let y = 14
  let score = 0
  let furthestJump = 0

  //Functions

  // Creates individual grid cells
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

  //* This Section deals with the movement of the sprite and human input from the keyboard
  // Adds and removes CSS Classes to the individual squares
  function goSprite(direction) {
    // console.log(`sprite went ${direction}`)
    if (direction === 'start') {
      cells[y][x].classList.add('sprite')
    }
    if (direction === 'U' && y !== 0) {
      // console.log('move up')
      cells[y][x].classList.remove('sprite')
      y--
      cells[y][x].classList.add('sprite')
    } else if (direction === 'D' && y !== 14) {
      // console.log('move down')
      cells[y][x].classList.remove('sprite')
      y++
      cells[y][x].classList.add('sprite')
    } else if (direction === 'L' && x !== 0) {
      // console.log('move left')
      cells[y][x].classList.remove('sprite')
      x--
      cells[y][x].classList.add('sprite')
    } else if (direction === 'R' && x !== 14) {
      // console.log('move right')
      cells[y][x].classList.remove('sprite')
      x++
      cells[y][x].classList.add('sprite')
    }
  }

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


  // Increments the furthest jump variable depending on how far the sprite has travelled previously
  // Also increments score variable by Jump Points
  function scoreIncrease() {
    if (height - y - 1 > furthestJump) {
      furthestJump++
      score += jumpPoints
    }
  }




  // TODO: On Key Down Change sprite to walking image then back to still on Key up



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
  createCells()





}
window.addEventListener('DOMContentLoaded', init)