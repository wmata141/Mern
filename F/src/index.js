import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './Estilos.css';
// Routes
import AppRoutes from './routes';
import history from './history';
// Component
import registerServiceWorker from './registerServiceWorker';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { fetchClientes } from './component/cliente/ActionCliente';
import { fetchProductos } from './component/producto/ActionProducto';

store.dispatch(fetchClientes());
store.dispatch(fetchProductos());

render(
    <Provider store={store}>
        <Router history={history}>
            <AppRoutes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
