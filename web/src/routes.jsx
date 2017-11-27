import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DrawerOpenRightExample from './components/Home/DrawerOpenRightExample'
import Notifications from 'react-notify-toast'

import About from './components/About'
import Home from './components/Home'
import AddUser from './components/AddUser'
import Login from './components/Login'
import NoMatch from './routes/NoMatch'
import MyAppBar from './components/MyAppBar'
import WrappHome from './routes/WrappHome'


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
        <MyAppBar onLeftIconButtonTouchTap={this.handleTouchTap}/>
				<DrawerOpenRightExample
					onClose={this.handleTouchTap}
					open={this.state.open}
				/>
				<div>
					<Switch>
						<Route path="/" exact component={WrappHome} />
						<Route path="/login" component={Login} />
						<Route path="/about" component={About} />
						<Route path="/registration" component={AddUser} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				<Notifications options={{ zIndex: 5000 }} />
			</div>
		)
	}
}