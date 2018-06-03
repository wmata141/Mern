import axios from 'axios';

export function fetchVentas() {
    return dispatch => {
      return axios.get("/venta")
      .then(response => {
        dispatch({
          type: "FETCH_VENTAS",
          ventas: response.data.ventas
        })
      });
    };
}

export function addToCompra(cart, id) {
  // Objeto el cual se añadira a cart con el id_venta
  var objeto = {
    id_cliente: id
  }
  cart.push(objeto);

  return dispatch => {
    fetch("/venta", {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(cart),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
      dispatch({
        type: "ADD_TO_COMPRA",
        cart
      })
    });
  };
};

export function fetchVenta(id) {
    return fetch("/venta/" + id, {
        method: 'GET',
        mode: 'CORS'
    }).then(res => res.json())
    .catch(err => err);
}

export function addToCart(product) {
    return {
        type: "ADD_TO_CART",
        product
    }
};

export function removeFromCart(product) {
    return {
        type: "REMOVE_FROM_CART",
        product
    }
};
