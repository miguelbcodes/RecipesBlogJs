const requestURL = "./recipes.json";
const request = new Request(requestURL);
const response = await fetch(request);
const recipes = await response.json(); //Recipes JSON object

//TODO: Function to show the recipes from the JSON object

//TODO: Show the recipes titles

//TODO: Show the recipes serves

//TODO: Add the recipes serves slider

//TODO: Add the reset serves button

//TODO: Show the recipes Ingredients

//TODO: Show the recipes Instructions

//TODO: Function to change the ingredients amount according to the serves slider

//TODO: Functio to reset ther serves slider to deafult according to the recipe
