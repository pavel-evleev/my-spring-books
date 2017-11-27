import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './../../components/Home'
import Authors from './../../components/Authors'
import Books from './../../components/Books'
import PrivateRoutes from './../PrivateRoutes'

 class WrappHome extends React.Component {
	render() {
		if (this.props.login == true) {
			return (
				<Switch>
					<Route path='/' exact component={Home} />
          <Route path='/authors' component={Authors} />
					<Route path='/books' component={Books} />
					{/*Route with param should be the last in list*/}
				</Switch>
			)
		}
		else {
			return (
        <Switch>
        </Switch>
			)
		}
	}
}

export default connect(state =>{
  return{
    login: state.loginReducer.login
  }
})(WrappHome)
