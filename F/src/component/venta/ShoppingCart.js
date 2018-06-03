import React, { Component } from 'react';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import { removeFromCart, addToCompra } from './ActionVenta';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const styles = {
  footer: {
    fontWeight: 'bold'
  }
}

class ShoppingCart extends Component {

  render() {
    return (
      <Panel header="Shopping Cart">
        <Table>
          <tbody>
          {this.props.cart.map(product =>
            <tr key={product._id}>
              <td>{product.name}</td>
              <td className="text-right">${product.price}</td>
              <td className="text-right">
                #{product.stock_user}
              </td>
              <td className="text-right">
                <Button bsSize="xsmall" bsStyle="danger" onClick={() => this.props.removeFromCart(product)}><Glyphicon glyph="trash" /></Button>
              </td>
            </tr>
          )}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="1" style={styles.footer}>
              Total: ${this.props.cart.reduce((sum, product) => sum + product.price * product.stock_user, 0)}
            </td>
            <td></td>
            <td style={styles.footer} className="text-right">
              Total: #{this.props.cart.reduce((sum, product) => sum + product.stock_user, 0)}
            </td>
            <td  className="text-right"><Link to="/venta"><Button bsSize="xsmall" bsStyle="success" onClick={() => this.props.addToCompra(this.props.cart, this.props.id_cliente)} ><Glyphicon glyph="shopping-cart" /></Button></Link></td>
          </tr>
          </tfoot>
        </Table>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product) {
      dispatch(removeFromCart(product));
    },
    addToCompra(cart, id) {
      dispatch(addToCompra(cart, id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ShoppingCart);
