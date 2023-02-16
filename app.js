// const toggleThemeButton = document.getElementById("toggle-theme-button");
// const body = document.querySelector("body");

// toggleThemeButton.addEventListener("click", function () {
//   body.classList.toggle("dark-theme");
// });

// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const resultsContainer = document.getElementById("results");
// const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";

// function displayRecipe(recipe) {
//   const recipeHTML = `
//     <div class="recipe">
//       <div class="recipe-info">
//         <h2 class="recipe-title">${recipe.title}</h2>
//         <div class="recipe-buttons">
//           <button class="save-button">SAVE</button>
//           <button class="cook-button">COOK</button>
//         </div>
//       </div>
//       <div class="recipe-image">
//         <img src="${recipe.image}" alt="${recipe.title}" />
//       </div>
//     </div>
//   `;
//   resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
// }

// function displayRecipes(recipes) {
//   resultsContainer.innerHTML = "";
//   const recipesHTML = recipes.map((recipe) => displayRecipe(recipe)).join("");
//   resultsContainer.insertAdjacentHTML("beforeend", recipesHTML);
// }

// function getRecipes(query, offset) {
//   const options = {
//     method: "GET",
//     url: "https://api.spoonacular.com/recipes/complexSearch",
//     params: {
//       apiKey: API_KEY,
//       query: query,
//       addRecipeInformation: true,
//       number: 5,
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
//   getRecipes(query, 0);
// });

// searchInput.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     const query = searchInput.value;
//     getRecipes(query, 0);
//   }
// });

// window.addEventListener("scroll", function () {
//   const scrollPosition = window.scrollY;
//   const windowSize = window.innerHeight;
//   const documentSize = document.documentElement.offsetHeight;
//   const maxScroll = documentSize - windowSize;
//   if (scrollPosition >= maxScroll) {
//     const query = searchInput.value;
//     const offset = resultsContainer.children.length;
//     getRecipes(query, offset);
//   }
// });

// const toggleThemeButton = document.getElementById("toggle-theme-button");
const body = document.querySelector("body");

// toggleThemeButton.addEventListener("click", function () {
//   body.classList.toggle("dark-theme");
// });

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");
const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";

function displayRecipe(recipe) {
  const recipeHTML = `
    <div class="recipe ${
      body.classList.contains("dark-theme") ? "dark-theme" : ""
    }">
      <h2>${recipe.title}</h2>
      <div class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <button class="btn btn-primary show-recipe-button">Show Recipe</button>
      </div>
    </div>
  `;
  resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
}

function displayRecipes(recipes) {
  resultsContainer.innerHTML = "";
  recipes.forEach((recipe) => displayRecipe(recipe));
}

function getRecipes(query, offset) {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params: {
      apiKey: API_KEY,
      query: query,
      addRecipeInformation: true,
      number: 5,
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
