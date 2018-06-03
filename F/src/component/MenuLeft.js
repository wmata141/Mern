import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
//Iconos
import Person  from 'material-ui/svg-icons/maps/person-pin';
import Producto  from 'material-ui/svg-icons/action/assignment-turned-in';
import ShoppingCar  from 'material-ui/svg-icons/action/shopping-cart';
import Line from 'material-ui/svg-icons/image/dehaze';
//Colors
import { blue500 } from 'material-ui/styles/colors';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

const style = {
  large: {
    width: 25,
    height: 25,
    padding: 20,
  },
  button: {
    margin: 0,
  }
};

class MenuLeft extends Component{

  constructor () {
    super();
    this.state = {
        open: false
    };
  }
  handleToggle = () => this.setState({open: !this.state.open});

  render () {
    return (
      <div>
        <AppBar onLeftIconButtonClick={this.handleToggle} >
            <ToolbarGroup>
                <Link to="/cliente"><RaisedButton
                    label="Clientes" icon={<Person/>} primary={true} style={style.button} />
                </Link>
                <Link to="/producto"><RaisedButton
                    label="Productos" icon={<Producto/>} primary={true} style={style.button} />
                </Link>
                <Link to="/venta"><RaisedButton
                    label="Ventas" icon={<ShoppingCar/>} primary={true} style={style.button} />
                </Link>
                <ToolbarSeparator />
                <IconMenu  iconButtonElement={
                    <IconButton touch={true} >
                      <NavigationExpandMoreIcon color="white"/>
                    </IconButton>
                }>
                <Link to="/cliente">
                  <MenuItem primaryText="Clientes" />
                </Link>
                <Link to="/producto">
                  <MenuItem primaryText="Productos" />
                </Link>
                <Link to="/venta">
                  <MenuItem primaryText="Ventas" />
                </Link>
                </IconMenu>
            </ToolbarGroup>

        </AppBar>
        <Drawer open={this.state.open} width={200}>
            <div className="azul"></div>
                <Line onClick={this.handleToggle} style={style.large} color={blue500} />
                <List>
                    <Link to="/cliente"><ListItem primaryText="Clientes" leftIcon={<Person color={blue500} />}/> </Link>
                    <Link to="/producto"><ListItem primaryText="Productos" leftIcon={<Producto color={blue500} />}/> </Link>
                    <Link to="/venta"><ListItem primaryText="Ventas" leftIcon={<ShoppingCar color={blue500} />}/> </Link>
                </List>
        </Drawer>
      </div>
    )
  }
}

export default MenuLeft;
