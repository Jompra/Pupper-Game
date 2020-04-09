function init() {
  //Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  //Grid Variables
  const height = 15
  const width = 15

  //Sprite Variables
  let x = 7
  let y = 14

  //Functions
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
    goSprite()
  }

  function goSprite() {
    console.log('initialize sprite ran')
    cells[y][x].classList.add('sprite')

  }
  function moveUp() {
    if (y === 0) return
    console.log('move up')
    cells[y][x].classList.remove('sprite')
    y--
    cells[y][x].classList.add('sprite')
  }
  function moveDown() {
    if (y === 14) return
    console.log('move Dn')
    cells[y][x].classList.remove('sprite')
    y++
    cells[y][x].classList.add('sprite')
  }
  function moveLeft() {
    if (x === 0) return
    console.log('move L')
    cells[y][x].classList.remove('sprite')
    x--
    cells[y][x].classList.add('sprite')
  }
  function moveRight() {
    if (x === 14) return
    console.log('move R')
    cells[y][x].classList.remove('sprite')
    x++
    cells[y][x].classList.add('sprite')
  }

  document.onkeydown = function (event) {
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