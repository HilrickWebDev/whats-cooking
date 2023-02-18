// const body = document.querySelector("body");

// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const resultsContainer = document.getElementById("results");
// const showMoreButton = document.createElement("button");
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
//   recipes.forEach((recipe) => displayRecipe(recipe));
// }

// function getRecipes(query, numRecipes, offset) {
//   const options = {
//     method: "GET",
//     url: "https://api.spoonacular.com/recipes/complexSearch",
//     params: {
//       apiKey: API_KEY,
//       query: query,
//       addRecipeInformation: true,
//       number: numRecipes,
//       offset: offset,
//     },
//   };

//   axios(options)
//     .then(function (response) {
//       const recipes = response.data.results;
//       displayRecipes(recipes);
//       if (recipes.length < numRecipes) {
//         showMoreButton.style.display = "none";
//       } else {
//         showMoreButton.style.display = "block";
//       }
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }

// searchButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   resultsContainer.innerHTML = "";
//   const query = searchInput.value;
//   offset = 0;
//   getRecipes(query, 10, offset);
// });

// searchInput.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     resultsContainer.innerHTML = "";
//     const query = searchInput.value;
//     offset = 0;
//     getRecipes(query, 10, offset);
//   }
// });

// showMoreButton.classList.add("btn", "btn-primary");
// showMoreButton.innerText = "Show More";
// showMoreButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   const query = searchInput.value;
//   offset += 10;
//   getRecipes(query, 10, offset);
// });

// window.addEventListener("scroll", function () {
//   const scrollPosition = window.scrollY;
//   const windowSize = window.innerHeight;
//   const documentSize = document.documentElement.offsetHeight;
//   const maxScroll = documentSize - windowSize;
//   if (scrollPosition >= maxScroll) {
//     const query = searchInput.value;
//     offset += 10;
//     getRecipes(query, 10, offset);
//   }
// });

// resultsContainer.after(showMoreButton);

const body = document.querySelector("body");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");
const showMoreButton = document.getElementById("show-more-button");
const API_KEY = "95cbf9cc98694dd593c38c4fb5b49865";
let currentOffset = 0;

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
  showMoreButton.style.display = "block";
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
  event.preventDefault();
  const query = searchInput.value;
  currentOffset += 10;
  getRecipes(query, currentOffset);
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const windowSize = window.innerHeight;
  const documentSize = document.documentElement.offsetHeight;
  const maxScroll = documentSize - windowSize;
  if (scrollPosition >= maxScroll && showMoreButton.style.display !== "none") {
    const query = searchInput.value;
    currentOffset += 10;
    getRecipes(query, currentOffset);
  }
});
