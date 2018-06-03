import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function fetchProductos() {
  return dispatch => {
    return axios.get("/producto")
    .then(response => {
      dispatch({
        type: "FETCH_PRODUCTS",
        productos: response.data.productos
      })
    });
  };
};

export function fetchProducto(id) {
  return fetch("/producto/" + id, {
      method: 'GET',
      mode: 'CORS'
  }).then(res => res.json())
  .catch(err => err);
}

export function deleteProducto(product) {
  return dispatch => {
    return fetch("/producto/" + product._id, {
        method: 'DELETE',
        mode: 'CORS'
    }).then(res => {
        dispatch({
          type: "DELETE_PRODUCTS",
          product
      })
    });
  };
};

export function createProducto(data) {
  return fetch("/producto", {
    method: 'POST',
    mode: 'CORS',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
    if(res.status === 200) {
      return res;
    } else {
      window.alert('ERROR CREATE');
    }
  }).catch(err => {
    console.error(err);
  });
}

export function updateProducto(id, data) {
    return fetch("/producto/" + id, {
        method: 'PUT',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log("res.status ActionCliente",res.status);
        if(res.status === 200) {
          return res;
        } else {
          window.alert('ERROR UPDATE');
        }
    }).catch(err => {
        console.error(err);
    });
}
