import React, { Component } from 'react';
import Form from './Form';
import { fetchCliente, updateCliente } from './ActionCliente';
// import history from '../../history';

class Update extends Component {

constructor(props) {
  super(props);

  this.state = {
    _id:this.props.match.params._id,
    dni:null,
    name:""
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

handleSubmit(data) {
  updateCliente(this.state._id, data)
  window.location.href='/cliente';
}

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}
          titulo="Modificar Cliente"
          _id={this.state._id}
          dni={this.state.dni}
          name={this.state.name}>
        </Form>
      </div>
    );
  };//End del render
};//End de la clase

export default Update;
