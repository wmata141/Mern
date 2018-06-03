import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import { ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { Button, Glyphicon } from 'react-bootstrap';
import { deleteProducto, fetchProducto } from './ActionProducto';

const style = {
  productos: {display: 'flex',alignItems: 'stretch',flexWrap: 'wrap'},
  product: {width: '140px'},
  paper: { margin:20, textAlign:'center'},
  derecha: { textAlign: 'right' }
};

class List extends Component {

render() {
  const EmptyMessage = (
    <Paper style={style.paper} zDepth={2}>
    <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
      <TableRow>
        <TableHeaderColumn style={style.derecha} colSpan="6" >
          <ToolbarGroup>
            <ToolbarTitle text="PRODUCTOS" />
            <Link to="/producto/create"><RaisedButton
                label="NUEVO PRODUCTO" primary={true} />
            </Link>
          </ToolbarGroup>
        </TableHeaderColumn >
      </TableRow>
      </TableHeader>
    </Table>
    <h1>There are no productos yet in your collection</h1>
    </Paper>
  );

  const ProductsList = (
    <Paper style={style.paper} zDepth={2}>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={style.derecha} colSpan="6" >
              <ToolbarGroup>
                <ToolbarTitle text="PRODUCTOS" />
                <Link to="/producto/create"><RaisedButton
                    label="NUEVO PRODUCTO" primary={true} />
                </Link>
              </ToolbarGroup>
            </TableHeaderColumn >
          </TableRow>
        </TableHeader>
      </Table>
      <div style={style.productos}>
          {this.props.productos.map(product =>
            <div key={product._id}>
            <div className="thumbnail" style={style.product} key={product._id}>
              <div className="panel-heading">
                <h4 className="panel-title"><Link to={`/producto/detail/${product._id}`}>{product.name}</Link></h4>
              </div>
              <img src={product.picture} alt={product.description} />
              <span>${product.price}</span>
              <div className="panel-footer">
                <div className="clearfix">
                  <div className="btn-group btn-group-sm pull-right">
                      <Button  role="button" bsStyle="info"><Link to={`/producto/detail/${product._id}`}><Glyphicon glyph="glyphicon glyphicon-eye-open" /></Link></Button>
                      <Button  role="button" bsStyle="success"><Link to={`/producto/update/${product._id}`}><Glyphicon glyph="glyphicon glyphicon-edit" /></Link> </Button>
                      <Button  role="button" bsStyle="warning" onClick={() => this.props.deleteProducto(product)}><Link to={`/producto`}> <Glyphicon glyph="glyphicon glyphicon-trash" /></Link></Button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
      </div>
    </Paper>
  )

    return (
      <div>
        {this.props.productos.length === 0 ? EmptyMessage : ProductsList}
      </div>
    );
  };//End del render
};//End de la clase

const mapStateToProps = state => {
  return {
    productos: state.productos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProducto(product) {
      dispatch(deleteProducto(product));
    },
    fetchProducto(product) {
      dispatch(fetchProducto(product));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (List);
