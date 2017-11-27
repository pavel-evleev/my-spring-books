import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AddBook from '../../components/AddBook'
import User from '../../components/User'
import CurrentUser from '../../components/CurrentUser'
import Users from '../../components/Users'
import AddAuthor from '../../components/AddAuthor'

 class PrivateRoutes extends React.Component {
	render() {
		if (this.props.login == true) {
			return (
				<Switch>
					<Route exact path="/users" component={Users} />
					<Route path='/users/add-book' component={AddBook} />
					<Route path='/users/add-author' component={AddAuthor} />
          <Route path='/users/my-page' component={CurrentUser} />
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

export default connect(state =>{
  return{
    login: state.loginReducer.login
  }
})(PrivateRoutes)