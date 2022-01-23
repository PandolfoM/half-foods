import {
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_DIETS,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CURRENT_DIETS,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

const initialState = {
  products: [],
  currentProduct: "",
  cart: [],
  cartOpen: false,
  categories: [],
  diets: [],
  currentDiet: "",
  currentCategory: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case UPDATE_CURRENT_PRODUCTS:
      return {
        ...state,
        currentProduct: action.currentProduct,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_DIETS:
      return {
        ...state,
        diets: [...action.diets],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    case UPDATE_CURRENT_DIETS:
      return {
        ...state,
        currentDiet: action.currentDiet,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
};

export default reducer;
