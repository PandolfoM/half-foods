const API_KEY = '2e27864513b64f7e9d0c8b554ef1257d'

export const searchFoodProducts = (query) => {
  return fetch(
    `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${API_KEY}`
  );
};

export const searchFoodProducts2 = (id) => {
  return fetch(
    `https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${API_KEY}`
  );
};
