import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Header extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <div className="Header">
        <header className="App-header">
          <h1 className="App-title">{title}</h1>
        </header>
      </div>
    );
  }
}

export default Header;
