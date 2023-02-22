const requestURL = "./recipes.json";
const request = new Request(requestURL);
const response = await fetch(request);
const recipes = await response.json(); //Recipes JSON object

// Function to show the recipes from the JSON object
function showRecipes(recipesObj) {
  const mainEl = document.querySelector("main");

  // Create a wrapper to the recipes
  const recipesSectionEl = document.createElement("section");
  recipesSectionEl.classList.add("container");
  mainEl.appendChild(recipesSectionEl);

  // Loop through the recipes objects
  for (const recipeObj of recipesObj) {
    // Create an article element to each recipe
    const recipeArticleEl = document.createElement("article");
    recipeArticleEl.classList.add("container__recipe");

    // Add the recipes images
    const recipeImageEl = document.createElement("div");
    recipeImageEl.style.backgroundImage = `url(${recipeObj.recipeImage})`;
    recipeImageEl.classList.add("recipe__image");
    recipeArticleEl.appendChild(recipeImageEl);

    // Add the recipes names
    const recipeNameEL = document.createElement("h3");
    recipeNameEL.textContent = recipeObj.recipeName;
    recipeNameEL.classList.add("recipe__heading-h3");
    recipeArticleEl.appendChild(recipeNameEL);

    // Add container to serves sliders and buttons
    const servesContainerEl = document.createElement("div");
    servesContainerEl.classList.add("recipe__container-serves");

    // Add the recipes serves
    const recipeServesEl = document.createElement("p");
    recipeServesEl.textContent = `Serves: ${recipeObj.recipeAmount}`;
    recipeServesEl.classList.add("para-serves");
    recipeArticleEl.appendChild(recipeServesEl);

    // Add the recipes serves slider
    const recipeServesSliderEl = document.createElement("input");
    recipeServesSliderEl.setAttribute("type", "range");
    recipeServesSliderEl.setAttribute("min", recipeObj.recipeAmount);
    recipeServesSliderEl.setAttribute("max", `${recipeObj.recipeAmount * 10}`);
    recipeServesSliderEl.setAttribute("value", recipeObj.recipeAmount); // The initial value is the default recipe serves amount
    recipeServesSliderEl.setAttribute("step", `${recipeObj.recipeAmount}`);
    recipeServesSliderEl.classList.add("slider");
    recipeServesSliderEl.setAttribute(
      "data-recipe-serves",
      recipeObj.recipeAmount
    );
    recipeServesSliderEl.style.backgroundSize = "1% 100%"; // Set the right background-size according to the recipe serves amount
    recipeArticleEl.appendChild(recipeServesSliderEl);

    // Add the reset recipes serves button
    const recipeServesButtonEl = document.createElement("button");
    recipeServesButtonEl.textContent = "Reset Serves";
    recipeServesButtonEl.classList.add("button");
    recipeArticleEl.appendChild(recipeServesButtonEl);

    // Create information container (ingredients and instructions)
    const infoContainerEl = document.createElement("div");
    infoContainerEl.classList.add("recipe__container-info");

    // Create wrraper to ingredients headings and lists
    const ingredientsInfoWrapperEl = document.createElement("div");
    ingredientsInfoWrapperEl.classList.add(
      "container-info__wrapper-ingredients"
    );

    // Add the recipe ingredients heading
    const ingredientsHeadingEl = document.createElement("h4");
    ingredientsHeadingEl.textContent = "Ingredients:";
    ingredientsHeadingEl.classList.add("recipe__heading-h4");
    ingredientsInfoWrapperEl.appendChild(ingredientsHeadingEl);

    // Create the recipe ingredients list
    const ingredientsListEl = document.createElement("ul");
    ingredientsListEl.classList.add("recipe__list");
    const ingredientsObj = recipeObj.ingredients;

    // Loop through the ingredients objects
    for (const ingredientObj of ingredientsObj) {
      // Add the elements properties separately as spans
      // Add the ingredient amount span
      const ingredientAmountEl = document.createElement("span");
      // Check if the ingredient amount < 1 to turn it to fraction
      if (ingredientObj.amount < 1 && ingredientObj.amount > 0) {
        ingredientAmountEl.textContent = decimalToFraction(
          ingredientObj.amount
        );
      } else {
        // Otherwise just show the ingredient amount according to the json file
        ingredientAmountEl.textContent = ingredientObj.amount;
      }
      ingredientAmountEl.classList.add("ingredient__amount");
      ingredientAmountEl.setAttribute(
        "data-ingredient-amount",
        ingredientObj.amount
      );

      // Add the ingredient unit span
      const ingredientunitEl = document.createElement("span");
      ingredientunitEl.textContent = ingredientObj.unit;
      ingredientunitEl.classList.add("ingredient__unit");

      // Add the ingredient element span
      const ingredientElementEl = document.createElement("span");
      ingredientElementEl.textContent = ingredientObj.element;
      ingredientElementEl.classList.add("ingredient__element");

      // Put the properties together in a list item
      const ingredientEl = document.createElement("li");
      ingredientEl.classList.add("list__ingredient");
      ingredientEl.append(
        ingredientAmountEl,
        ingredientunitEl,
        " ",
        ingredientElementEl
      );

      // Add the ingredients to the ingredients list
      ingredientsListEl.appendChild(ingredientEl);
    }

    // Add the recipe ingredients list to the ingredients wrapper
    ingredientsInfoWrapperEl.appendChild(ingredientsListEl);

    // Create wrraper to ingredients headings and lists
    const instructionsInfoWrapperEl = document.createElement("div");
    instructionsInfoWrapperEl.classList.add(
      "container-info__wrapper-ingredients"
    );

    // Add the recipe instructions heading
    const instructionsHeadingEl = document.createElement("h4");
    instructionsHeadingEl.textContent = "Instructions:";
    instructionsHeadingEl.classList.add("recipe__heading-h4");
    instructionsInfoWrapperEl.appendChild(instructionsHeadingEl);

    // Create the recipe instructions list
    const instructionsListEl = document.createElement("ol");
    instructionsListEl.classList.add("recipe__list");

    // Loop through the instructions array
    for (const instructionObj of recipeObj.instructions) {
      const instructionEl = document.createElement("li");
      instructionEl.classList.add("list__instruction");
      instructionEl.textContent = instructionObj;
      // Add the instructions to the iinstructions list
      instructionsListEl.appendChild(instructionEl);
    }

    // Add the instrucitons list to the instructions wrapper
    instructionsInfoWrapperEl.appendChild(instructionsListEl);

    // Add the wrappers to the infos container
    infoContainerEl.appendChild(ingredientsInfoWrapperEl);
    infoContainerEl.appendChild(instructionsInfoWrapperEl);

    // Add information container (ingredients and instructions) to the article
    recipeArticleEl.appendChild(infoContainerEl);

    // Add the recipe article to the recipes wrapper
    recipesSectionEl.appendChild(recipeArticleEl);
  }
  // Add the recipes wrapper to the page
  mainEl.appendChild(recipesSectionEl);
}

showRecipes(recipes);

// Create the sliders list
const slidersList = document.querySelectorAll(".slider");
// Loop through the sliders list
for (let i = 0; i < slidersList.length; i++) {
  // Event to change the ingredients amount according to the sliders value
  slidersList[i].onchange = function () {
    // Create the ingredients amount numbers list
    const ingredientAmountListEl = this.parentNode.querySelectorAll(
      ".ingredient__amount"
    );
    // Loop through the ingredients amount numbers list
    for (let i = 0; i < ingredientAmountListEl.length; i++) {
      if (ingredientAmountListEl[i].dataset.ingredientAmount != 0) {
        // Calculate the ingredient amount according to the slider value
        let sliderAmountValue =
          (ingredientAmountListEl[i].dataset.ingredientAmount /
            this.dataset.recipeServes) *
          this.value;
        // Check if the ingredient amount has decimals
        if (sliderAmountValue % 1 != 0) {
          // Split the integer ingredient amount
          let integerValue = sliderAmountValue - (sliderAmountValue % 1);
          // Turn the decimal ingredient amount into a fraction
          let fractionValue = decimalToFraction(
            (sliderAmountValue % 1).toFixed(2) // Fix the decimal places before turn the ingredient amount into a fraction
          );
          console.log(fractionValue);
          // Check if the the integer ingredient amount is zero, then just show the fraction
          if (integerValue === 0) {
            ingredientAmountListEl[i].textContent = `${fractionValue}`;
          } else {
            // Check if the the fraction ingredient amount is zero, then just show the integer
            if (fractionValue === "0/1") {
              ingredientAmountListEl[i].textContent = `${integerValue}`;
            } else {
              // If both integer and fraction ingredient amount are greater than zero, then show both
              ingredientAmountListEl[
                i
              ].textContent = `${integerValue} ${fractionValue}`;
            }
          }
        } else {
          ingredientAmountListEl[i].textContent =
            (ingredientAmountListEl[i].dataset.ingredientAmount /
              this.dataset.recipeServes) *
            this.value;
        }
      }
    }
  };

  // Event to change the serves heading according to the sliders value
  slidersList[i].oninput = function () {
    const paraServesEl = this.parentNode.querySelector(".para-serves");
    paraServesEl.textContent = `Serves: ${this.value}`;
  };
}

const buttonsList = document.querySelectorAll(".button");
for (let i = 0; i < buttonsList.length; i++) {
  // Event to reset the slider and amounts to the default
  buttonsList[i].onclick = function () {
    // Reset the slider value
    const sliderEL = this.parentNode.querySelector(".slider");
    sliderEL.value = sliderEL.dataset.recipeServes;

    // Reset the slider appearece
    sliderEL.style.backgroundSize = "1% 100%";

    // Reset the serves heading
    const paraServesEl = this.parentNode.querySelector(".para-serves");
    paraServesEl.textContent = `Serves: ${sliderEL.dataset.recipeServes}`;

    // Reset the ingredients amount numbers
    const ingredientAmountListEl = this.parentNode.querySelectorAll(
      ".ingredient__amount"
    );
    // Loop through the ingredients amount numbers list
    for (let i = 0; i < ingredientAmountListEl.length; i++) {
      ingredientAmountListEl[i].textContent =
        ingredientAmountListEl[i].dataset.ingredientAmount;
    }
  };
}

// Function to find greatest common divisor between two numbers
function greatestCommonDivisor(a, b) {
  if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.
  return greatestCommonDivisor(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
}

// Function to turn decimals into fractions
function decimalToFraction(decimal) {
  let decimalPlaces = decimal.toString().length - 2;
  let denominator = Math.pow(10, decimalPlaces);
  let numerator = decimal * denominator;

  let divisor = greatestCommonDivisor(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return Math.floor(numerator) + "/" + Math.floor(denominator);
}

// Function to change the slider track according to its value
function handleInputChange(e) {
  let sliderTarget = e.target;

  const min = sliderTarget.min;
  const max = sliderTarget.max;
  const val = sliderTarget.value;

  sliderTarget.style.backgroundSize =
    ((val - min) * 100) / (max - min) + "% 100%";
}

// Event to trigger the function when the slider gets a input
slidersList.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});
