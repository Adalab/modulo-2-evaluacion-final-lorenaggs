'use strict';

const buttonSearch = document.querySelector('.button-search');
const cocktailssearch = document.querySelector('.cocktailssearch');

let html = [];

function handleClick() {
  const input = document.querySelector('.input').value;
  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      let html = '';
      html = `Lista de cocteles buscados`;
      const dataDrinks = data.drinks;
      if (data.drinks === null) {
        html = `El coctel buscado no existe`;
      } else {
        for (const drink of dataDrinks) {
          const nameDrink = drink.strDrink;
          const imageDrink = drink.strDrinkThumb;
          const idDrink = drink.idDrink;

          html += `<li>`;
          html += `<div class="cocktails" id="${idDrink}" onclick='favorite(${nameDrink})'> ${nameDrink}`;
          if ((imageDrink === '')) {
            html += `<img class="image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=C%C3%B3ctel" width="50">`;
          } else {
            html += `<img class="image" src="${imageDrink}" width="50">`;
          }
          html += `</div>`;
          html += `</li>`;
        }
      }
      cocktailssearch.innerHTML = html;
    });
}

buttonSearch.addEventListener('click', handleClick);


// paletas favoritas
const favorites = document.querySelector('.favorites');
const listcocktails = document.querySelector('.listcocktails');


// function favorite(event) {

//   console.log(event.currentTarget.idDrink);
//   console.log('hola');
// }



// listcocktails.addEventListener('click', handleClickFavorite);