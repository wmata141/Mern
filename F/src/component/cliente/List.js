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
import {blue500, cyan500, pinkA200} from 'material-ui/styles/colors';
// Button
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import ShoppingCar  from 'material-ui/svg-icons/action/shopping-cart';

import { fetchCliente, deleteCliente} from './ActionCliente';

const style = {
  products: {display: 'flex',alignItems: 'stretch',flexWrap: 'wrap'},
  product: {width: '140px'},
  paper: { margin:20, textAlign:'center'},
  derecha: { textAlign: 'right' }
};

class List extends Component {

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
            <ToolbarTitle text="CLIENTES" />
            <Link to="/cliente/create"><RaisedButton
                label="NUEVO CLIENTE" primary={true} />
            </Link>
          </ToolbarGroup>
        </TableHeaderColumn >
      </TableRow>
      </TableHeader>
    </Table>
    <h1>There are no clientes yet in your collection</h1>
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
          <ToolbarTitle text="CLIENTES" />
          <Link to="/cliente/create"><RaisedButton
              label="NUEVO CLIENTE" primary={true} />
          </Link>
      </ToolbarGroup>
      </TableHeaderColumn>
    </TableRow>
    <TableRow>
    <TableHeaderColumn tooltip="id">ID</TableHeaderColumn>
    <TableHeaderColumn tooltip="dni">DNI</TableHeaderColumn>
    <TableHeaderColumn tooltip="name">name</TableHeaderColumn>
    <TableHeaderColumn></TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
      stripedRows={true}
    >
    {this.props.clientes.map(client =>
      <TableRow key={client._id} selectable={false}>
        <TableRowColumn>{client._id}</TableRowColumn>
        <TableRowColumn>{client.dni}</TableRowColumn>
        <TableRowColumn>{client.name}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/compra/${client._id}`}><ShoppingCar
            color={cyan500} hoverColor={pinkA200}/>
          </Link>
          <Link to={`/cliente/detail/${client._id}`}><EyeIcon
            color={blue500} hoverColor={cyan500}/>
          </Link>
          <Link to={`/cliente/update/${client._id}`}><EditIcon
            color={blue500} hoverColor={cyan500}/>
          </Link>
          <TrashIcon onClick={() => this.props.deleteCliente(client)} color={blue500} hoverColor={cyan500}/>
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
        {this.props.clientes.length === 0 ? emptyMessage : ventasList}
      </div>
    )
  }//End del render
}//End de la clase
const mapStateToProps = state => {
  return {
    clientes: state.clientes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCliente(client) {
      dispatch(deleteCliente(client));
    },
    fetchCliente(client) {
      dispatch(fetchCliente(client));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (List);
