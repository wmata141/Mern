import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { addToCart } from './ActionVenta';
import { connect } from 'react-redux';

const styles = {
  products: { display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' },
  product: { width: '120px', marginLeft: 10, marginRight: 10 }
};

class ProductList extends Component {

  render() {
    return (
      <div style={styles.products}>
        {this.props.productos.map(product =>
          <div key={product._id}>
            <div className="thumbnail" style={styles.product}>
              <div className="panel-heading">
                <h4 className="panel-title">{product.name}</h4>
              </div>
              <img src={product.picture} alt={product.name} />
              <div className="caption">
                <div className="panel-footer">
                <p>
                  <Button bsStyle="primary" onClick={() => this.props.addToCart(product)} role="button" disabled={product.inventory <= 0}>${product.price} <Glyphicon glyph="shopping-cart" /></Button>
                </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productos: state.productos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart(product) {
      dispatch(addToCart(product));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductList);
