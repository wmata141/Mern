import React, { Component } from 'react';
import Form from './Form';
import { fetchProducto } from './ActionProducto';

export default class Update extends Component {

constructor(props) {
  super(props);

  this.state = {
    _id: this.props.match.params._id,
    category: "",
    name: "",
    price: "",
    picture: ""
  };

  fetchProducto(this.state._id)
    .then((data) => {
        this.setState(state => {
            state.category = data.producto.category;
            state.name = data.producto.name;
            state.price = data.producto.price;
            state.picture = data.producto.picture;
            return state;
        });
    })
    .catch((err) => {
        console.error('err', err);
    });
}

render() {
  return (
    <div>
      <Form
        titulo="Detalle Producto"
        disabled={true}
        _id = { this.state._id }
        category = { this.state.category }
        name = { this.state.name }
        price = { this.state.price }
        picture = { this.state.picture }>
      </Form>
    </div>
  );
}
}
