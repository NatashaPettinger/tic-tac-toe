//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
      //document.getElementById('ingredientList').removeChild('li')
      //document.getElementById('instructionList').removeChild('li');

      document.querySelector('h2').innerText = data.drinks[0].strDrink

      document.querySelector('img').src = data.drinks[0].strDrinkThumb

      //parse ingredients
      document.getElementById('ingredients').innerText = 'Ingredients:\n'
      let ing = []
      for (let i = 1; i <= 15; i++) {
        let meas = 'strMeasure' + i;
        let what = 'strIngredient' + i;
        if (data.drinks[0][meas] && data.drinks[0][what]) {
          ing.push(data.drinks[0][meas] + data.drinks[0][what]);
        } else if (!data.drinks[0][meas] && data.drinks[0][what]) {
          ing.push(data.drinks[0][what]);
        } else break;
      }
      //Append ingredients to DOM
        let item;
        ing.forEach(x => {
          item = document.createElement('li');
          item.textContent = `${x}`;
          document.getElementById('ingredientList').appendChild(item);
        })

      //format instructions.
      let inst = data.drinks[0].strInstructions.split('.');
      if (inst[inst.length - 1] === '.') inst.pop();
      document.querySelector('.instructions').innerText = 'Instructions:\n' 
        let dir;
        inst.forEach(y => {
          dir = document.createElement('li');
          dir.textContent = `${y}.`;
          document.getElementById('instructionList').appendChild(dir);
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

