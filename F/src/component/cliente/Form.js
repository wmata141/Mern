import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

const style = {
  paper: { margin:20, textAlign:'center', padding: 20},
  button: { margin: 2 },
  derecha: { textAlign: 'right' }
};

class Form extends Component {

constructor(props) {
  super(props);

  this.state = {
    _id: this.props._id,
    dni: this.props.dni,
    name: this.props.name,

    dniError: "",
    nameError: "",
    titulo: this.props.titulo || "Nuevo Cliente"
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
      dniError: "",
      nameError: ""
    };

    if(!this.state.dni) {
      isError = true; errors.dniError = "El campo no puede quedar vacio";
    } else {
      if (this.state.dni.length < 1 || this.state.dni.length > 10) { isError = true; errors.dniError = "DNI debe contener entre 1 y 10 digitos";};
      if (isNaN(this.state.dni)) { isError = true; errors.dniError = "DNI debe contener solo digitos";};
    }
    if(!this.state.name) {
      isError = true; errors.nameError = "El campo no puede quedar vacio";
    }else{
      if (this.state.name.length < 3 || this.state.name.length > 20) { isError = true; errors.nameError = "Nombre debe contener entre 3 y 20 letras";};
      if (!isNaN(this.state.name)) { isError = true; errors.nameError = "Nombre debe contener solo letras";};
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
        <div id="cliente">
          <Paper style={style.paper} zDepth={2}>
            <Subheader><b>{this.state.titulo}</b></Subheader>
            <TextField
              id="dni"
              value={this.state.dni}
              errorText={this.state.dniError}
              hintText="DNI"
              floatingLabelText="DNI"
              name="dni"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br />
            <TextField
              id="name"
              value={this.state.name}
              errorText={this.state.nameError}
              hintText="Nombre"
              floatingLabelText="Nombre"
              name="name"
              disabled={this.props.disabled}
              onChange={e => this.change(e)}
            /><br/><br/>
            <Link to="/cliente">
              <RaisedButton
                onClick={e => this.onSubmit(e)}
                label="GUARDAR"
                primary={true}
                disabled={this.props.disabled}
                style={style.button}
              />
            </Link>
            <Link to="/cliente"><RaisedButton
                label="REGRESAR" primary={true} style={style.button} />
            </Link>
          </Paper>
          </div>
      </form>
    );
  };//End del render
};//End de la clase

const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Form);
