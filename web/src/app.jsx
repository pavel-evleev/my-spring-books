import React from 'react';
import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter
} from 'react-router-dom'


import './styles.scss';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
         <Routes/>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
