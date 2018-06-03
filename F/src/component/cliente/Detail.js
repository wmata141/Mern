import React, { Component } from 'react';
import Form from './Form';
import { fetchCliente } from './ActionCliente';

export default class Detail extends Component {

constructor(props) {
  super(props);

  this.state = {
    _id:this.props.match.params._id,
    dni:"",
    name:null
  };

  fetchCliente(this.state._id)
    .then((data) => {
        this.setState(state => {
            state.dni=data.cliente.dni;
            state.name=data.cliente.name;
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
          titulo="Detalle Cliente"
          disabled={true}
          _id={this.state._id}
          dni={this.state.dni}
          name={this.state.name}>
        </Form>
      </div>
    );
  }
}
