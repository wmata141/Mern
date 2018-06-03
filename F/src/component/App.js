import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Head from './Head';
import MenuLeft from './MenuLeft';
import Content from './Content';

class App extends Component {
  static PropTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const{ children } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <div className="Head"><Head/></div>
          <div className="MenuLeft"><MenuLeft/></div>
          <Content body={children}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
