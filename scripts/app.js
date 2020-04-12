function init() {
  //Dom Elements
  const grid = document.querySelector('.grid')
  const homeGrid = document.querySelector('.homes')
  const scoreCard = document.querySelector('#score')
  const startlives = 5
  const cells = []
  const homes = []
  let livesRemaining = startlives

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

  //Obstacle and Home Variables
  // TODO: find a better way of generating Zombie Initializer Lists. Harder Levels should have more!!!
  // TODO: Get all zombies for level 1 set
  //Obstacle co-ordinates arrays
  const initZombie = [[12, 3], [12, 7], [12, 11], [12, 13], [12, 8], [11, 7], [10, 7]]
  const initTrain = [[4, 5], [4, 4],[3, 8], [3, 9]]
  


  //Functions
  // Randomises zombie Sprite number (get different zombie sprites each reload)
  //TODO make random number correct multiplier depending on number of sprites also refactor this so Math.Random is only called once!

  function randomizeZombies() {
    for (let i = 0; i <= initZombie.length - 1; i++) {
      const sprite = Math.ceil(Math.random() * 4)
      initZombie[i].push(sprite)
      console.log(initZombie[i])
    }
  }

  randomizeZombies() // TODO Make this happen at a more appropriate time


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
  function createHomes() {
    for (let i = 0; i < 5; i++) {
      const home = document.createElement('div')
      homeGrid.appendChild(home)
      home.textContent = `home ${i}`
      homes.push(home)
      home.style.backgroundImage = 'url(./assets/safe.png)'
    }
  }
  createHomes()
  createCells() //TODO <==== Remove this and initiate on click of start button
  //Draws and advances trains depending on even/odd rows
  

  function initializeTrains(arr) {
    for (let i = 0; i < arr.length; i++) {
      cells[arr[i][0]][arr[i][1]].classList.add('train')
      if (arr[i][1] % 2 === 0){
        cells[arr[i][0]][arr[i][1]].style.backgroundImage = 'url(./assets/train_left.png)'
        cells[arr[i][0]][arr[i][1]].style.backgroudPosition = 'left bottom'
        
      } else {
        cells[arr[i][0]][arr[i][1]].style.backgroundImage = 'url(./assets/train_right.png)'
        cells[arr[i][0]][arr[i][1]].style.backgroudPosition = 'right bottom'
      }
    }
  }
  initializeTrains(initTrain)


  // TODO: This needs refactoring. Probably move the UDLR arguments into the onkey function and make a single 'Move' Function.
  // TODO: goSprite Function needs re-factoring to be more efficient
  //* This Section deals with the movement of the sprite and human input from the keyboard
  // Adds and removes CSS Classes to the individual squares
  // TODO: make dog turn on key down instead of key up and add animation of legs

  function goSprite(direction) {
    // console.log(`sprite went ${direction}`)
    if (direction === 'start') {
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      y = 14
      x = 7
      cells[y][x].classList.add('sprite')
    }
    if (direction === 'U' && y !== 0) {
      // console.log('move up')
      cells[y][x].style.backgroundImage = ''
      cells[y][x].classList.remove('sprite')
      y--
      cells[y][x].classList.add('sprite')
      cells[y][x].style.backgroundImage = 'url(./assets/pupper_spr_fwd.png)'
    } else if (direction === 'D' && y !== width - 1) {
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
        detectCollision()
        break
      case 38:
        moveUp()
        detectCollision()
        detectSafe()
        break
      case 39:
        moveRight()
        detectCollision()
        break
      case 40:
        moveDown()
        detectCollision()
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
  

  //* Deals with obstical Movement

  //Takes values in initZombie array and places them on the grid, also inc/decrements x value based on even/odd y value 
  function advanceZombies() {
    for (let i = 0; i < initZombie.length; i++) {
      let direction = ''
      cells[initZombie[i][0]][initZombie[i][1]].classList.remove('zombie')
      cells[initZombie[i][0]][initZombie[i][1]].style.backgroundImage = ''
      if (initZombie[i][0] % 2 === 0 && initZombie[i][1] === width - 1) {
        initZombie[i][1] = 0
        direction = 'R'
      } else if (initZombie[i][0] % 2 === 0) {
        direction = 'R'
        initZombie[i][1]++
      } else if (initZombie[i][0] % 2 !== 0 && initZombie[i][1] === 0) {
        initZombie[i][1] = width - 1
        direction = 'L'
      } else {
        initZombie[i][1]--
        direction = 'L'
      }

      cells[initZombie[i][0]][initZombie[i][1]].classList.add('zombie')
      cells[initZombie[i][0]][initZombie[i][1]].style.backgroundImage = `url(../assets/zombies/${direction}_${initZombie[i][2]}.png)`
    }
    detectCollision()
  }



  //calls the advance zombies in 1 second increments
  //TODO: link speed multiplier to level dificulty
  setInterval(() => {
    advanceZombies(initZombie)
  }, 500)

  function detectCollision() {
    if (cells[y][x].classList.contains('zombie')) {
      console.log(`x=${x} y=${y}`)
      cells[y][x].classList.remove('sprite')
      x = 7
      y = height - 1
      goSprite('start')
      livesRemaining--
      console.log(livesRemaining)
    }
  }
  function detectSafe() {
    console.log('ran detectSafe')
    if (x === 1 && y === 1) {
      homes[0].style.backgroundImage = 'url(./assets/safe_active.png)'
      goSprite('start')
    } else if (x === 4 && y === 1) {
      homes[1].style.backgroundImage = 'url(./assets/safe_active.png)'
      goSprite('start')
    } else if (x === 7 && y === 1) {
      homes[2].style.backgroundImage = 'url(./assets/safe_active.png)'
      goSprite('start')
    } else if (x === 10 && y === 1) {
      homes[3].style.backgroundImage = 'url(./assets/safe_active.png)'
      goSprite('start')
    } else if (x === 13 && y === 1) {
      homes[4].style.backgroundImage = 'url(./assets/safe_active.png)'
      goSprite('start')
    }
  }



}
window.addEventListener('DOMContentLoaded', init)