import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { routerReducer } from 'react-router-redux';

const clientes = (state=[], action) => {
  switch(action.type) {
    case "FETCH_CLIENTES":
      return action.clientes;

    case "DELETE_CLIENTES":
      return state.filter(client => client.id_cliente !== action.client.id_cliente);

    case "SELECT_CLIENTES":
      return action.cliente;

   default:
    return state;
  }
};

const productos = (state=[], action) => {
  switch(action.type) {
    case "FETCH_PRODUCTS":
      return action.productos;

    case "DELETE_PRODUCTS":
      return state.filter(product => product._id !== action.product._id);

    case "SELECT_PRODUCTS":
      return action.productos;

   default:
    return state;
  }
};

const ventas = (state=[], action) => {
  switch(action.type) {
    case "FETCH_VENTAS":
       return action.ventas;
    //
    // case "ADD_VENTAS":
    //   return state.concat(action.ventas);
    //
    // case "SELECT_VENTAS":
    //   return action.ventas;

   default:
    return state;
  }
};

const cart = (state=[], action) => {
  switch(action.type) {
    case "ADD_TO_CART":
       let existe = state.indexOf(action.product);
       if(existe !== -1){
         action.product.stock_user += 1;
         return state.concat();
       } else {
         action.product['stock_user'] = 1;
         return state.concat(action.product);
       }

    case "REMOVE_FROM_CART":
      return state.filter(product => product._id !== action.product._id);

    case "ADD_TO_COMPRA":
      state.length = 0;
      return state.concat();

   default:
    return state;
  }
};

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export default createStore(combineReducers({cart, productos, ventas, clientes, routing: routerReducer}), applyMiddleware(logger, thunk));
