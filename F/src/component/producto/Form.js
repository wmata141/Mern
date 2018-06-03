import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  paper: { margin:20, textAlign:'center', padding: 10},
  button: { margin: 2 },
  product: { width: '100px', marginLeft: 10, marginRight: 10 },
  cuadro: { height: 100, width: 100, margin: 20, textAlign: 'center', display: 'inline-block'},
};

export default class Form extends Component {

constructor(props) {
  super(props);

  this.state = {
    category: this.props.category,
    categoryError: "",
    name: this.props.name,
    nameError: "",
    price: this.props.price,
    priceError: "",
    picture: this.props.picture,
    pictureError: "",
    titulo: this.props.titulo || "Nuevo Producto",
  }
}

componentWillReceiveProps(props) {
  this.setState(props);
}

change(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
};

onSubmit(e) {
  e.preventDefault();
  const err = this.validate();
  if (!err) {
    this.props.onSubmit(this.state);
  }

};

validate = () => {
    let isError = false;
    const errors = {
      categoryError: "",
      nameError: "",
      priceError: "",
    };
    if(!this.state.category) {
      isError = true; errors.categoryError = "El campo no puede quedar vacio";
    }else{
      if (this.state.category.length < 1 || this.state.category.length > 20) { isError = true; errors.categoryError = "category debe contener entre 3 y 20 letras";};
      if (!isNaN(this.state.category)) { isError = true; errors.categoryError = "category debe contener solo letras";};
    }
    if(!this.state.name) {
      isError = true; errors.nameError = "El campo no puede quedar vacio";
    }else{
      if (this.state.name.length < 1 || this.state.name.length > 20) { isError = true; errors.nameError = "name debe contener entre 3 y 20 letras";};
      if (!isNaN(this.state.name)) { isError = true; errors.nameError = "name debe contener solo letras";};
    }
    if(!this.state.price) {
      isError = true; errors.priceError = "El campo no puede quedar vacio";
    }else{
      if (this.state.price < 1 ) { isError = true; errors.priceError = "price debe ser mayor que 0 ";};
      if (isNaN(this.state.price)) { isError = true; errors.priceError = "price debe contener solo digitos";};
    }

      this.setState({
        ...this.state,
        ...errors
      });
    return isError;
  };

  render() {
    return (
      <form>
        <div id="producto">
          <Paper style={style.paper} zDepth={2}>
            <Subheader><b>{this.state.titulo}</b></Subheader>
            <TextField
              id="category"
              value={this.state.category}
              errorText={this.state.categoryError}
              hintText="category"
              floatingLabelText="category"
              name="category"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br />
            <TextField
              id="name"
              value={this.state.name}
              errorText={this.state.nameError}
              hintText="name"
              floatingLabelText="name"
              name="name"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br />
            <TextField
              id="price"
              value={this.state.price}
              errorText={this.state.priceError}
              hintText="price"
              floatingLabelText="price"
              name="price"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br />
            <TextField
              id="picture"
              value={this.state.picture}
              hintText="picture"
              floatingLabelText="picture"
              name="picture"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br />
            <Paper style={style.cuadro}>
              <div className="thumbnail">
                {this.state.picture !== '' && <img src={this.state.picture} alt={this.picture} />}
              </div>
            </Paper>
            <br />
            <RaisedButton
              onClick={e => this.onSubmit(e)}
              label="GUARDAR"
              primary={true}
              disabled={this.props.disabled}
              style={style.button}
            />
            <Link to="/producto"><RaisedButton
                label="REGRESAR" primary={true} style={style.button} />
            </Link>
          </Paper>
          </div>
      </form>
    );
  }
}
