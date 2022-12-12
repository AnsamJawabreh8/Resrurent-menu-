//import axios from 'axios';
let myRecipes = [];
let choice = document.querySelectorAll(".nav-link");
for (let i = 0; i < choice.length; i++) {
  choice[i].addEventListener("click", function (e) {
    getRecipes(e.target.text);
    //console.log(e.target.text) ;
  });
}

getRecipes("pasta");
async function getRecipes(meal) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  let data = await response.json();
  myRecipes = data.recipes;
  displayData();
}

function displayData() {
  let result = ``;
  for (var i = 0; i < myRecipes.length; i++) {
    result += `
        <div class="col-md-3">
        <div class="data">
            <h2 class='heading'>${myRecipes[i].title}</h2>
            <img class="image" src="${myRecipes[i].image_url}" />
            <a data-bs-toggle="modal" data-bs-target="#recipeModal"
            class="btn btn-danger" onClick="openDetails(${myRecipes[i].recipe_id})">details</a>
            </div>
            </div>
        `;
  }
  document.getElementById("data").innerHTML = result;
}

async function openDetails(recipe_id) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`
  );
  let result = await response.json();
  let recipeDetails = result.recipe;
  let ingredients = recipeDetails.ingredients;
  let list = ``;
  for (let i = 0; i < ingredients.length; i++) {
    list += `<li>
        ${ingredients[i]}
        </li>`;
  }
  let data = `
    <h2>${recipeDetails.title}</h2>    
    <img src="${recipeDetails.image_url}" class="w-100" />
    <ul>
        ${list}
    </ul>
    <p>rank is ${recipeDetails.social_rank}</p>

    `;
  document.getElementById("recipeData").innerHTML = data;
}
