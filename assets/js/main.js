let gameboard = {
  board: document.getElementById('newBoard'),
  boxes: document.querySelectorAll('.box'),
  turn: 1,

  nextPlayer() {
    this.turn === 1? this.turn = 2: this.turn = 1;
  },
  checkWin() {
    let val = [];
    Array.from(gameboard.boxes).forEach(element => val.push(element.innerText));
    console.log(val)

    if (val[0] !== '') {
      if (val[0] === val[1] && val[1] === val[2]) {
        document.getElementById('result').innerText = `${val[0]} wins!`
      } else if (val[0] === val[3] && val[3] === val[6]) {
        document.getElementById('result').innerText = `${val[0]} wins!`
      } else if (val[0] === val[4] && val[4] === val[8]) {
        document.getElementById('result').innerText = `${val[0]} wins!`
      }
    }
    if (val[4] !== '') {
      if (val[1] === val[4] && val[4] === val[7]) {
        document.getElementById('result').innerText = `${val[4]} wins!`
      } else if (val[3] === val[4] && val[4] === val[5]) {
        document.getElementById('result').innerText = `${val[4]} wins!`
      }
    }
    if (val[2] !== '') {
      if (val[6] === val[7] && val[7] === val[8]) {
        document.getElementById('result').innerText = `${val[6]} wins!`
      } else if (val[2] === val[5] && val[5] === val[8]) {
        document.getElementById('result').innerText = `${val[6]} wins!`
      } else if (val[2] === val[4] && val[4] === val[6]) {
        document.getElementById('result').innerText = `${val[6]} wins!`
      }
    }
  },

  placeTile(click) {
    /* if (click.target) = click.target.innerText; */
    if (gameboard.turn === 1 && !click.target.innerText) {
      click.target.innerText = 'X';
    } 
    if (gameboard.turn === 2 && click.target.innerText === '') {
      click.target.innerText = 'O';
    } 
    gameboard.nextPlayer();
    gameboard.checkWin();
  },

  reset() {
    Array.from(gameboard.boxes).forEach(element => element.innerHTML = '');
    gameboard.turn = 1;
    document.getElementById('result').innerText = '';
  },
  
}

document.getElementById('search-form').addEventListener('click', gameboard.reset)
Array.from(gameboard.boxes).forEach(element => element.addEventListener('click', gameboard.placeTile))