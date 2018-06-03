import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

class Compra extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_cliente: this.props.match.params.id_cliente
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={8}>
              <ProductList/>
            </Col>
            <Col sm={4}>
              <ShoppingCart id_cliente={this.state.id_cliente}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Compra;
