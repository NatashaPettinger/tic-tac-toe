//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('input[type="button"]').addEventListener('click', searchResults)

function searchResults() {
  let drink = `i=${document.querySelector('input').value.split(' ').join('&')}`;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)

      sessionStorage.setItem('cocktailList', data);

      //NEED TO SAVE THE COCKTAIL ID NUMBER IN AN ARRAY
      let drinkLinks = [];
      let idNumbers = [];
      data.drinks.forEach(x => {
        drinkLinks.push(x.strDrink);
        idNumbers.push(x.idDrink);});
      document.getElementById('header').classList = 'hidden';
      document.getElementById('signup-form').innerHTML += `<input id="chooseRandom" class="clink" type="button" value="Choose for me!" />` /* <li id="chooseRandom" class="clink">Choose for me!</li>; */
      drinkLinks.forEach((x, i) => {
        document.getElementById('searchResults').innerHTML += `<li id="i${i}" class="clink"><a>${x}</a></li>`;
      })
      Array.from(document.querySelectorAll('.clink')).forEach(d => d.addEventListener('click', findDrink))

      let index
      function findDrink(click) {
        index = click.target.id;
        if (index === "chooseRandom") {
          index = Math.floor(Math.random() * data.drinks.length);
        } else index = index.slice(1);
        getDrink(idNumbers[index]);
      }

      })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function getDrink(j){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${j}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let cocktail = data.drinks[0];
        console.log(cocktail)

        
        document.querySelector('h2').innerText = cocktail.strDrink
        document.querySelector('img').src = cocktail.strDrinkThumb
        document.querySelector('.wide').classList.remove('hidden')
        //parse ingredients
        let ing = [];
        for (let i = 1; i <= 15; i++) {
          let meas = 'strMeasure' + i;
          let what = 'strIngredient' + i;
          
          if (cocktail[meas] && cocktail[what]) {
            if (!cocktail[what].endsWith(' ')) {
              ing.push(cocktail[meas] + ' ' + cocktail[what]);
            } else {
              ing.push(cocktail[meas] + cocktail[what]);
            }
          } else if (!cocktail[meas] && cocktail[what]) {
            ing.push(cocktail[what]);
          } else break;
        }
        //Append ingredients to DOM
        document.getElementById('ingredients').innerText = 'Ingredients:'
        document.getElementById('ingredientList').innerHTML = '';
        ing.forEach(x => {
          document.getElementById('ingredientList').innerHTML += `<li>${x}</li>`;
        })

        //parse & append instructions to DOM:
        let inst = cocktail.strInstructions.split('.');
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

//add pick random functionality
//make gallery of drinks w/ their names
