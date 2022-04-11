'use strict';

const buttonSearch = document.querySelector('.button-search');
const cocktailssearch = document.querySelector('.cocktailssearch');
// const listcocktails = document.querySelector('.listcocktails');

let data = [];

// function preventDefault(event) {
//   event.preventDefault

// }

function handleClick() {
  deleteAllFavorites();
  const input = document.querySelector('.input').value;
  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      const dataDrinks = data.drinks;
      if (data.drinks === null) {
        cocktailssearch.innerHTML = `El coctel buscado no existe`;
      } else {
        localStorage.setItem('drinkslocal', JSON.stringify(dataDrinks));
        buildCoctails();
      }
    });
}

buttonSearch.addEventListener('click', handleClick);

function buildCoctails() {
  const drinkslocal = JSON.parse(localStorage.getItem('drinkslocal'));
  let html = '';
  html = `<h3 class="licoctails">Lista de cocteles buscados</h3>`;
  // html += `<div>`;
  for (const drink of drinkslocal) {
    const nameDrink = drink.strDrink;
    const imageDrink = drink.strDrinkThumb;
    const idDrink = drink.idDrink;

    html += `<li class="listsearch">`;
    html += `<div class="cocktails" id="${idDrink}"> ${nameDrink}`;
    if (imageDrink === '') {
      html += `<img class="image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=C%C3%B3ctel" width="50">`;
    } else {
      html += `<img class="image" src="${imageDrink}" width="50">`;
    }

    html += `</div>`;
    html += `</li>`;
  }
  // html += `</div>`;
  cocktailssearch.innerHTML = html;
  handleClickCocktails();
}

// let favorites = [];
function handleClickCocktails() {
  const cocktails = document.querySelectorAll('.cocktails');
  for (const item of cocktails) {
    item.addEventListener('click', addFavorite);
  }
}
// let favorites = [];
function addFavorite(event) {
  const drinkslocal = JSON.parse(localStorage.getItem('drinkslocal'));
  const favoritesHtml = document.querySelector('.favorites');
  const idCocktailsSelect = event.currentTarget.id;
  console.log(idCocktailsSelect);
  const favoriteSelect = drinkslocal.find(
    (x) => x.idDrink === idCocktailsSelect
  );

  let drinkslocalFav = JSON.parse(localStorage.getItem('drinkslocalFav'));
  // console.log(drinkslocalFav);

  // console.log(favoriteSelect);
  if (drinkslocalFav === null) {
    drinkslocalFav = [];
  }

  drinkslocalFav.push(favoriteSelect);
  // console.log(drinkslocalFav);
  // localstorage
  localStorage.setItem('drinkslocalFav', JSON.stringify(drinkslocalFav));

  let favHtml = '';

  const nameDrink = favoriteSelect.strDrink;
  const imageDrink = favoriteSelect.strDrinkThumb;
  const idDrink = favoriteSelect.idDrink;
  favHtml += `<li class="favorites">`;
  favHtml += `<div class="cocktailsfavorites"> ${nameDrink}`;
  favHtml += `<img class="image" src="${imageDrink}" width="50">`;
  favHtml += `<p class="selecdelete" id="fav-${idDrink}">x</p>`;
  favHtml += `</div>`;
  favHtml += `</li>`;

  favoritesHtml.innerHTML += favHtml;
  colorSelecFav(idDrink);
  handleClickDelete();
}

function colorSelecFav(idDrink) {
  const cocktailsFav = document.getElementById(idDrink);
  console.log(cocktailsFav);
  cocktailsFav.classList.add('selecfavo');
}

function handleClickDelete() {
  const selecdelete = document.querySelectorAll('.selecdelete');
  for (const itemFav of selecdelete) {
    itemFav.addEventListener('click', deleteFavorite);
  }
}

function deleteFavorite(event) {
  const idFavorite = event.currentTarget.id;
  // console.log(idFavorite);
  let idCoctel = idFavorite.split('-')[1];
  // console.log(idCoctel);
  const drinkslocalFav = JSON.parse(localStorage.getItem('drinkslocalFav'));
  const indexFavorite = drinkslocalFav.findIndex((x) => {
    // console.log(typeof x.idDrink, typeof idCoctel);
    return x.idDrink === idCoctel;
  });
  drinkslocalFav.splice(indexFavorite, 1);

  localStorage.setItem('drinkslocalFav', JSON.stringify(drinkslocalFav));
  const favoritesHtml = document.querySelector('.favorites');
  favoritesHtml.innerHTML = '';
  let favHtml = '';
  for (const drinks of drinkslocalFav) {
    // console.log(drinks);
    const nameDrink = drinks.strDrink;
    const imageDrink = drinks.strDrinkThumb;
    const idDrink = drinks.idDrink;
    favHtml += `<li class="favorites">`;
    favHtml += `<div class="cocktailsfavorites"> ${nameDrink}`;
    favHtml += `<img class="image" src="${imageDrink}" width="50">`;
    favHtml += `<p class="selecdelete" id="fav-${idDrink}">x</p>`;
    favHtml += `</div>`;
    favHtml += `</li>`;

    favoritesHtml.innerHTML = favHtml;
    // colorSelecFav(idDrink);
  }
  handleClickDelete();
  deleteBorderSearch(idCoctel);
  deleteAllFavorites();
}

function deleteBorderSearch(idDrink) {
  const cocktailsFav = document.getElementById(idDrink);
  cocktailsFav.classList.remove('selecfavo');
}

const buttonReset = document.querySelector('.button-reset');
const favoritesHtml = document.querySelector('.favorites');

function deleteAllFavorites() {
  localStorage.removeItem('drinkslocal');
  localStorage.removeItem('drinkslocalFav');
  favoritesHtml.innerHTML = '';
  cocktailssearch.innerHTML = '';
}

buttonReset.addEventListener('click', deleteAllFavorites);
