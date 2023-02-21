const requestURL = "./recipes.json";
const request = new Request(requestURL);
const response = await fetch(request);
const recipes = await response.json(); //Recipes JSON object
