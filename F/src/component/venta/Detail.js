import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderColumn,
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { fetchVenta } from './ActionVenta';

const style = {
  products: {display: 'flex',alignItems: 'stretch',flexWrap: 'wrap'},
  product: {width: '140px'},
  paper: { margin:20, textAlign:'center'},
  derecha: { textAlign: 'right' }
};

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ventas: []
    };

    fetchVenta(this.props.match.params.id_venta)
      .then((data) => {
          this.setState(state => {
              var valores = [];
              for(var i=0;i<data.length;i++){
                valores[i] = {
                  id_venta: data[i].id_venta,
                  nombre_producto: data[i].nombre_producto,
                  cantidad: data[i].cantidad
                }
              }
              state.ventas = valores;
              return state;
          });
      })
      .catch((err) => {
          console.error('err', err);
      });
  }

  render() {
  const emptyMessage = (
    <Paper style={style.paper} zDepth={2}>
    <Table>
      <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      >
      <TableRow>
        <TableHeaderColumn style={style.derecha} colSpan="2" >
          <ToolbarGroup>
            <ToolbarTitle text="VENTAS" />
            <Link to="/venta"><RaisedButton
                label="SALIR" primary={true} />
            </Link>
          </ToolbarGroup>
        </TableHeaderColumn >
      </TableRow>
      </TableHeader>
    </Table>
    <h1>There are no ventas yet in your collection</h1>
    </Paper>
  );

  const ventasList = (
    <div className="Venta">
    <Paper style={style.paper} zDepth={2}>
    <Table
        fixedHeader={true}
        fixedFooter={true}
        selectable={true}
        multiSelectable={false}
    >
    <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
    >
    <TableRow>
      <TableHeaderColumn colSpan="2" style={style.derecha}>
      <ToolbarGroup>
          <ToolbarTitle text="Ventas" />
          <Link to="/venta"><RaisedButton
              label="SALIR" primary={true} />
          </Link>
      </ToolbarGroup>
      </TableHeaderColumn>
    </TableRow>
    <TableRow>
      <TableHeaderColumn tooltip="Producto">Producto</TableHeaderColumn>
      <TableHeaderColumn tooltip="Cantidad">Cantidad</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
      stripedRows={true}
    >
    {this.state.ventas.map(vent =>
      <TableRow key={vent.id_producto} selectable={false}>
        <TableRowColumn>{vent.nombre_producto}</TableRowColumn>
        <TableRowColumn>{vent.cantidad}</TableRowColumn>
      </TableRow>
    )}
    </TableBody>
    </Table>
    </Paper>
    </div>
  );

  return (
    <div>
      {this.props.ventas.length === 0 ? emptyMessage : ventasList}
    </div>
  );
  };
}
const mapStateToProps = state => {
  return {
    ventas: state.ventas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVenta(vent) {
      dispatch(fetchVenta(vent));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (List);
