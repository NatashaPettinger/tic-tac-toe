//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function addEvents() {
  document.querySelector('#searchButton').addEventListener('click', searchResults)
  document.getElementById('search').addEventListener('keypress', function(event) {
  if (event.key === "Enter"){
    event.preventDefault();
    document.getElementById('searchButton').click();
  }})
}
addEvents();

/* 
function newPage() {
  let drink = `i=${document.getElementById('search').value}`;
  window.open('results.html', '_self');
  searchResults(drink)
}
 */
function searchResults() {
  let drink = `i=${document.getElementById('search').value}`;
  //hide drink recipe, if shown.
  /* if (document.querySelector('.wide').classList === 'wide') {
    document.querySelector('.wide').classList += 'hidden';
  } */
  document.querySelector('.wide').classList.add('hidden');
  document.querySelector('.searchSection').classList.remove('hidden');
  //hide header to make more room for search results.
  document.getElementById('header').classList = 'hidden';

  

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)

      //save the cocktail ID numbers & drink names in arrays.
      let drinkLinks = [];
      let idNumbers = [];
      data.drinks.forEach(x => {
        drinkLinks.push(x.strDrink);
        idNumbers.push(x.idDrink);});
      
      //add choose for me button to DOM
      if (!document.getElementById('chooseRandom')) {
        document.getElementById('search-form').innerHTML += `<input id="chooseRandom" class="clink" type="button" value="Choose for me!" />`
      }
      
      //clear search results string & add links to cocktail recipes.
      let searchResults = '';
      drinkLinks.forEach((x, i) => {
        searchResults += `<li><a  id="i${i}" class="clink">${x}</a></li>`;
      })
      document.getElementById('searchResults').innerHTML = searchResults;

      //add event listeners
      Array.from(document.querySelectorAll('.clink')).forEach(d => d.addEventListener('click', findDrink))
      addEvents()

      let index
      function findDrink(click) {
        index = click.target.id;
        if (index === "chooseRandom") {
          index = Math.floor(Math.random() * data.drinks.length);
        } else {
          index = index.slice(1);
        }
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
        document.querySelector('.searchSection').classList.add('hidden');
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
