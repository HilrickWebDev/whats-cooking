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
//       <h2>${recipe.title}</h2>
//       <img src="${recipe.image}" alt="${recipe.title}"/>
//     </div>
//   `;
//   resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
// }

// // function displayRecipes(recipes) {
// //   resultsContainer.innerHTML = "";
// //   recipes.forEach((recipe) => displayRecipe(recipe));
// // }

// function displayRecipe(recipe) {
//   const recipeHTML = `
//     <div class="recipe">
//       <h2>${recipe.title}</h2>
//       <img src="${recipe.image}" alt="${recipe.title}"/>
//       <div class="buttons-container">
//         <button class="save-button">SAVE</button>
//         <button class="cook-button">COOK</button>
//       </div>
//     </div>
//   `;
//   resultsContainer.insertAdjacentHTML("beforeend", recipeHTML);
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

const toggleThemeButton = document.getElementById("toggle-theme-button");
const body = document.querySelector("body");

toggleThemeButton.addEventListener("click", function () {
  body.classList.toggle("dark-theme");
});

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");
const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";

function displayRecipe(recipe) {
  const recipeHTML = `
    <div class="recipe">
      <h2>${recipe.title}</h2>
      <div class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-buttons">
          <button class="save-button">SAVE</button>
          <button class="cook-button">COOK</button>
        </div>
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
