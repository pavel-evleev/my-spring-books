import React from 'react'
import Routes from './routes'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import  rootReducer from './ducks'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {  BrowserRouter } from 'react-router-dom'


// ------------------------------------
const store = createStore(rootReducer)
window.store = store
// ------------------------------------


import './styles.scss';

export default class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider>
				<BrowserRouter>
					<Provider store = {store}>
				 		<Routes/>
				 </Provider >
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}
