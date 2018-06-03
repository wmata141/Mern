import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function fetchClientes() {
    return dispatch => {
      return axios.get("/cliente")
      .then(response => {
        dispatch({
          type: "FETCH_CLIENTES",
          clientes: response.data.clientes
        })
      });
    };
};

export function fetchCliente(id) {
    return fetch("/cliente/" + id, {
        method: 'GET',
        mode: 'CORS'
    }).then(res => res.json())
    .catch(err => err);
}

export function updateCliente(id, data) {
    return fetch("/cliente/" + id, {
        method: 'PUT',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 200) {
          return res;
        } else {
          window.alert('ERROR UPDATE');
        }
    }).catch(err => {
        console.error(err);
    });
}

export function createCliente(data) {
    return fetch("/cliente", {
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

export function deleteCliente(client) {
  return dispatch => {
    return fetch("/cliente/" + client._id, {
      method: 'DELETE',
      mode: 'CORS'
    }).then(res => {
      dispatch({
        type: "DELETE_CLIENTES",
        client
      })
    });
  };
};
