import React, { Component } from 'react';

import Form from './Form';
import { createProducto } from './ActionProducto';

export default class Create extends Component {

    handleSubmit(data) {
      createProducto(data);
      window.location.href='/producto';
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}></Form>
            </div>
        );
    }
}
