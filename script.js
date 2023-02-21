const requestURL = "./recipes.json";
const request = new Request(requestURL);
const response = await fetch(request);
const recipes = await response.json(); //Recipes JSON object

// Function to show the recipes from the JSON object
function showRecipes(recipesObj) {
  const mainEl = document.querySelector("main");

  // Create a wrapper to the recipes
  const recipesSectionEl = document.createElement("section");
  mainEl.appendChild(recipesSectionEl);

  // Loop through the recipes objects
  for (const recipeObj of recipesObj) {
    // Create an article element to each recipe
    const recipeArticleEl = document.createElement("article");

    // Add the recipes names
    const recipeNameEL = document.createElement("h3");
    recipeNameEL.textContent = recipeObj.recipeName;
    recipeArticleEl.appendChild(recipeNameEL);

    // Add the recipes serves
    const recipeServesEl = document.createElement("p");
    recipeServesEl.textContent = `Serves: ${recipeObj.recipeAmount}`;
    recipeServesEl.classList.add("para__serves");
    recipeArticleEl.appendChild(recipeServesEl);

    // Add the recipes serves slider
    const recipeServesSliderEl = document.createElement("input");
    recipeServesSliderEl.setAttribute("type", "range");
    recipeServesSliderEl.setAttribute("min", "1");
    recipeServesSliderEl.setAttribute("max", "100");
    recipeServesSliderEl.setAttribute("value", recipeObj.recipeAmount); // The initial value is the default recipe serves amount
    recipeServesSliderEl.classList.add("slider");
    recipeServesSliderEl.setAttribute(
      "data-recipe-serves",
      recipeObj.recipeAmount
    );
    recipeArticleEl.appendChild(recipeServesSliderEl);

    // Add the reset recipes serves button
    const recipeServesButtonEl = document.createElement("button");
    recipeServesButtonEl.textContent = "Reset Serves";
    recipeArticleEl.appendChild(recipeServesButtonEl);

    // Add the recipe ingredients heading
    const ingredientsHeadingEl = document.createElement("h4");
    ingredientsHeadingEl.textContent = "Ingredients:";
    recipeArticleEl.appendChild(ingredientsHeadingEl);

    // Create the recipe ingredients list
    const ingredientsListEl = document.createElement("ul");
    const ingredientsObj = recipeObj.ingredients;

    // Loop through the ingredients objects
    for (const ingredientObj of ingredientsObj) {
      // Add the elements properties separately as spans
      const ingredientAmountEl = document.createElement("span");
      ingredientAmountEl.textContent = ingredientObj.amount;
      ingredientAmountEl.classList.add("ingredient__amount");
      ingredientAmountEl.setAttribute(
        "data-ingredient-amount",
        ingredientObj.amount
      );
      const ingredientUnityEl = document.createElement("span");
      ingredientUnityEl.textContent = ingredientObj.unity;
      ingredientUnityEl.classList.add("ingredient__unity");
      const ingredientElementEl = document.createElement("span");
      ingredientElementEl.textContent = ingredientObj.element;
      ingredientElementEl.classList.add("ingredient__element");

      // Put the properties together in a list item
      const ingredientEl = document.createElement("li");
      ingredientEl.append(
        ingredientAmountEl,
        ingredientUnityEl,
        " ",
        ingredientElementEl
      );

      // Add the ingredients to the ingredients list
      ingredientsListEl.appendChild(ingredientEl);
    }

    // Add the recipe ingredients list
    recipeArticleEl.appendChild(ingredientsListEl);

    // Add the recipe instructions heading
    const instructionsHeadingEl = document.createElement("h4");
    instructionsHeadingEl.textContent = "Instructions:";
    recipeArticleEl.appendChild(instructionsHeadingEl);

    // Create the recipe instructions list
    const instructionsListEl = document.createElement("ol");

    // Loop through the instructions array
    for (const instructionObj of recipeObj.instructions) {
      const instructionEl = document.createElement("li");
      instructionEl.textContent = instructionObj;
      // Add the instructions to the iinstructions list
      instructionsListEl.appendChild(instructionEl);
    }

    // Add the instrucitons list
    recipeArticleEl.appendChild(instructionsListEl);

    // Add the recipe article to the recipes wrapper
    recipesSectionEl.appendChild(recipeArticleEl);
  }
  // Add the recipes wrapper to the page
  mainEl.appendChild(recipesSectionEl);
}

showRecipes(recipes);

// Create the sliders list
const slidersListEl = document.querySelectorAll(".slider");
// Loop through the sliders list
for (let i = 0; i < slidersListEl.length; i++) {
  // Event to change the ingredients amount according to the sliders value
  slidersListEl[i].onchange = function () {
    // Create the ingredients amount numbers list
    const recipeAmountListEl = this.parentNode.querySelectorAll(
      ".ingredient__amount"
    );
    // Loop through the ingredients amount numbers list
    for (let i = 0; i < recipeAmountListEl.length; i++) {
      if (recipeAmountListEl[i].dataset.ingredientAmount != 0) {
        // Update the ingredient amount according to the slider value
        recipeAmountListEl[i].textContent =
          (recipeAmountListEl[i].dataset.ingredientAmount /
            this.dataset.recipeServes) *
          this.value;
      }
    }
  };

  // Event to change the serves heading according to the sliders value
  slidersListEl[i].oninput = function () {
    const paraServesEl = document.querySelector(".para__serves");
    paraServesEl.textContent = `Serves: ${this.value}`;
  };
}

//TODO: Functio to reset ther serves slider to deafult according to the recipe
