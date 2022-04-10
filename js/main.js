//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', searchResults)

function searchResults() {
  let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
      document.getElementById('searchHeading').innerText = 'Search Results'

      let drinkLinks = [];
      data.drinks.forEach(x => drinkLinks.push(x.strDrink));

      document.getElementById('searchResults').innerHTML = '';
      drinkLinks.forEach((x, i) => {
        document.getElementById('searchResults').innerHTML += `<li id="i${i}" class="clink">${x}</li>`;
      })
      Array.from(document.querySelectorAll('.clink')).forEach(d => d.addEventListener('click', findDrink))

      let index
      function findDrink(click) {
        index = click.target.id[1];
        getDrink(index);
      }
    })
}

function getDrink(index){
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)

      document.querySelector('h2').innerText = data.drinks[index].strDrink

      document.querySelector('img').src = data.drinks[index].strDrinkThumb

      //parse ingredients
      let ing = [];
      for (let i = 1; i <= 15; i++) {
        let meas = 'strMeasure' + i;
        let what = 'strIngredient' + i;
        if (data.drinks[index][meas] && data.drinks[index][what]) {
          ing.push(data.drinks[index][meas] + data.drinks[index][what]);
        } else if (!data.drinks[index][meas] && data.drinks[index][what]) {
          ing.push(data.drinks[index][what]);
        } else break;
      }
      console.log(ing)
      //Append ingredients to DOM
      document.getElementById('ingredients').innerText = 'Ingredients:'
      document.getElementById('ingredientList').innerHTML = '';
      ing.forEach(x => {
        document.getElementById('ingredientList').innerHTML += `<li>${x}</li>`;
      })

      //parse & append instructions to DOM:
      let inst = data.drinks[index].strInstructions.split('.');
      if (inst[inst.length - 1] === '') inst.pop();
      document.querySelector('.instructions').innerText = 'Instructions:' 
      document.getElementById('instructionList').innerHTML = '';
      inst.forEach(y => {
        document.getElementById('instructionList').innerHTML += `<li>${y}.</li>`
      })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

