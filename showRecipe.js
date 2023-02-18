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
