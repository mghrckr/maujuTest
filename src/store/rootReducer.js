import { combineReducers } from "redux";

const usersState = {
  usser: null,
  users: [],
  loading: true
}

const productsState = {
  products: [],
  loading: true
}


const productsReducer = (state = productsState, actions) => {
  switch (actions.type) {
    case 'products/get':
      return {
        ...state,
        products: actions.payload,
        loading: false
      };
    case 'product/add':
      return {
        ...state,
        products: [...state.products, actions.payload],
      };
    case 'product/update':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === actions.payload.id ? actions.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== actions.payload),
      };
    default:
      return state;
  }
}

const usersReducer = (state = usersState, action) => {
  switch (action.type) {
    case "user/get":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "users/get":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "user/add":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  user: usersReducer,
})

export default rootReducer