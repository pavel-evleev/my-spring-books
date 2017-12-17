import React from 'react'
import Routes from './routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './services/ducks'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { ping } from './services/ducks/middleware'


// ------------------------------------
const store = createStore(rootReducer, applyMiddleware(ping))
window.store = store
// ------------------------------------


import './styles.scss';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Provider store={store}>
            <Routes />
          </Provider >
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
