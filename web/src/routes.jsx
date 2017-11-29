import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DrawerOpenRightExample from './components/Home/DrawerOpenRightExample'
import Notifications from 'react-notify-toast'

import About from './components/About'
import Authors from './components/Authors'
import Books from './components/Books'
import Home from './components/Home'
import AddUser from './components/AddUser'
import AddBook from './components/AddBook'
import User from './components/User'
import Users from './components/Users'
import AddAuthor from './components/AddAuthor'
import Login from './components/Login'
import NoMatch from './routes/NoMatch'
import MyAppBar from './components/MyAppBar'
import PrivateRoute from './routes/PrivateRoute'

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
						<Route path="/" exact component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/about" component={About} />
						<Route path="/registration" component={AddUser} />
            <PrivateRoute exact path="/users" component={Users} />
				  	<PrivateRoute path='/users/add-book' component={AddBook} />
					  <PrivateRoute path='/users/add-author' component={AddAuthor} />
            <PrivateRoute path='/users/:id' component={User} />
            <PrivateRoute path='/authors' component={Authors} />
					  <PrivateRoute path='/books' component={Books} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				<Notifications options={{ zIndex: 5000 }} />
			</div>
		)
	}
}