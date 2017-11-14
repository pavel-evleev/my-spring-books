import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import DrawerOpenRightExample from './components/Home/DrawerOpenRightExample'
import Notifications from 'react-notify-toast'

import About from './components/About'
import Books from './components/Books'
import Home from './components/Home'
import Authors from './components/Authors'
import AddUser from './components/AddUser'
import Login from './components/Login'
import NoMatch from './routes/NoMatch'
import PrivateRoutes from './routes/PrivateRoutes'


/**
	* Hash url router.
	* Connect components with browser url links.
	*/
export default class Routes extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	handleTouchTap = () => {
		this.setState({ open: !this.state.open })
	}

	render() {
		return (
			<div>
				<AppBar
					title="MySpringBooks"
					onLeftIconButtonTouchTap={this.handleTouchTap}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<DrawerOpenRightExample
					onClose={this.handleTouchTap}
					open={this.state.open}
				/>
				<div>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/about" component={About} />
						<Route path="/books" component={Books} />
						<Route path="/authors" component={Authors} />
						<Route path="/registration" component={AddUser} />
						<Route path="/users" component={PrivateRoutes} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				<Notifications options={{ zIndex: 5000 }} />
			</div>
		)
	}
}