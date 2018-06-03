import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderColumn,
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
// Colors
import {blue500, cyan500} from 'material-ui/styles/colors';
// Button
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';

import { fetchVenta, fetchVentas } from './ActionVenta';
import store from '../../store';

const style = {
  products: {display: 'flex',alignItems: 'stretch',flexWrap: 'wrap'},
  product: {width: '140px'},
  paper: { margin:20, textAlign:'center'},
  derecha: { textAlign: 'right' }
};

class List extends Component {

  componentDidMount() {
    store.dispatch(fetchVentas());

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
        <TableHeaderColumn style={style.derecha} colSpan="6" >
          <ToolbarGroup>
            <ToolbarTitle text="VENTAS" />
            <Link to="/"><RaisedButton
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
      <TableHeaderColumn colSpan="4" style={style.derecha}>
      <ToolbarGroup>
          <ToolbarTitle text="VENTAS" />
          <Link to="/"><RaisedButton
              label="SALIR" primary={true} />
          </Link>
      </ToolbarGroup>
      </TableHeaderColumn>
    </TableRow>
    <TableRow>
      <TableHeaderColumn tooltip="Identificador">Factura</TableHeaderColumn>
      <TableHeaderColumn tooltip="Cliente">Cliente</TableHeaderColumn>
      <TableHeaderColumn tooltip="Fecha">Fecha</TableHeaderColumn>
      <TableHeaderColumn></TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
      stripedRows={true}
    >
    {this.props.ventas.map(vent =>
      <TableRow key={vent._id} selectable={false}>
        <TableRowColumn>{vent._id}</TableRowColumn>
        <TableRowColumn>{vent.fecha}</TableRowColumn>
        <TableRowColumn>{vent.cliente}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/venta/detail/${vent._id}`}><EyeIcon
            color={blue500} hoverColor={cyan500}/>
          </Link>
        </TableRowColumn>
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

};//End del render
};//End de la clase
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
