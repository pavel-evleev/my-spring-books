import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AddBook from '../../components/AddBook'
import User from '../../components/User'
import Users from '../../components/Users'
import AddAuthor from '../../components/AddAuthor'

export default class PrivateRoutes extends React.Component {
	render() {
		if (localStorage.getItem("isLoggedIn") == "true") {
			return (
				<Switch>
					<Route exact path="/users" component={Users} />
					<Route path='/users/add-book' component={AddBook} />
					<Route path='/users/add-author' component={AddAuthor} />
					{/*Route with param should be the last in list*/}
					<Route path='/users/:id' component={User} />
				</Switch>
			)
		}
		else {
			return (
				<Redirect to="/login" />
			)
		}
	}
}