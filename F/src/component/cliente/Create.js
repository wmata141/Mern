import React, { Component } from 'react';

import Form from './Form';
import { createCliente } from './ActionCliente';

export default class Create extends Component {

    handleSubmit(data) {
      createCliente(data);
      window.location.href='/cliente';
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}></Form>
            </div>
        );
    }
}
