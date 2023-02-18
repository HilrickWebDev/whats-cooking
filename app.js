// const body = document.querySelector("body");

// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const resultsContainer = document.getElementById("results");
// const showMoreButton = document.getElementById("show-more-button");
// const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";
// let offset = 0;

// function displayRecipe(recipe) {
//   const recipeHTML = `
//     <div class="recipe ${
//       body.classList.contains("dark-theme") ? "dark-theme" : ""
//     }">
//       <h2>${recipe.title}</h2>
//       <div class="recipe-image">
//         <img src="${recipe.image}" alt="${recipe.title}" />
//         <button class="btn btn-primary show-recipe-button">Show Recipe</button>
//       </div>
//     </div>
//   `;
//   resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
// }

// function displayRecipes(recipes) {
//   resultsContainer.innerHTML = "";
//   recipes.forEach((recipe) => displayRecipe(recipe));
//   showMoreButton.style.display = "block";
// }

// function getRecipes(query) {
//   const options = {
//     method: "GET",
//     url: "https://api.spoonacular.com/recipes/complexSearch",
//     params: {
//       apiKey: API_KEY,
//       query: query,
//       addRecipeInformation: true,
//       number: 10,
//       offset: offset,
//     },
//   };

//   axios(options)
//     .then(function (response) {
//       const recipes = response.data.results;
//       displayRecipes(recipes);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }

// searchButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   const query = searchInput.value;
//   offset = 0;
//   getRecipes(query);
// });

// searchInput.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     const query = searchInput.value;
//     offset = 0;
//     getRecipes(query);
//   }
// });

// window.addEventListener("scroll", function () {
//   const scrollPosition = window.scrollY;
//   const windowSize = window.innerHeight;
//   const documentSize = document.documentElement.offsetHeight;
//   const maxScroll = documentSize - windowSize;
//   if (scrollPosition >= maxScroll) {
//     const query = searchInput.value;
//     offset = resultsContainer.children.length;
//     getRecipes(query);
//   }
// });

// showMoreButton.addEventListener("click", function () {
//   const query = searchInput.value;
//   offset = resultsContainer.children.length;
//   getRecipes(query);
// });

const body = document.querySelector("body");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");
const showMoreButton = document.getElementById("show-more-button");
const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";

function displayRecipe(recipe) {
  const recipeHTML = `
    <div class="recipe ${
      body.classList.contains("dark-theme") ? "dark-theme" : ""
    }">
      <h2>${recipe.title}</h2>
      <div class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <a href="${
          recipe.sourceUrl
        }" target="_blank" class="btn btn-primary show-recipe-button">Show Recipe</a>
      </div>
    </div>
  `;
  resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
}

function displayRecipes(recipes) {
  resultsContainer.innerHTML = "";
  recipes.forEach((recipe) => displayRecipe(recipe));
  if (recipes.length === 0) {
    resultsContainer.innerHTML = `
      <div class="text-center mt-5">
        <h1 class="text-danger">Slow down, ${getRandomChefName()}!</h1>
      </div>
    `;
  }
  showMoreButton.style.display = recipes.length === 0 ? "none" : "block";
}

function getRecipes(query, offset) {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params: {
      apiKey: API_KEY,
      query: query,
      addRecipeInformation: true,
      number: 10,
      offset: offset,
    },
  };

  axios(options)
    .then(function (response) {
      const recipes = response.data.results;
      displayRecipes(recipes);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getRandomChefName() {
  const chefs = ["Gordon Ramsay", "Jamie Oliver", "You Pothead"];
  const randomIndex = Math.floor(Math.random() * chefs.length);
  return chefs[randomIndex];
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const query = searchInput.value;
  getRecipes(query, 0);
});

searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const query = searchInput.value;
    getRecipes(query, 0);
  }
});

showMoreButton.addEventListener("click", function (event) {
  const query = searchInput.value;
  const offset = resultsContainer.children.length;
  getRecipes(query, offset);
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const windowSize = window.innerHeight;
  const documentSize = document.documentElement.offsetHeight;
  const maxScroll = documentSize - windowSize;
  if (scrollPosition >= maxScroll) {
    const query = searchInput.value;
    const offset = resultsContainer.children.length;
    getRecipes(query, offset);
  }
});
