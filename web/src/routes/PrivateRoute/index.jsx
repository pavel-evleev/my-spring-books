import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component{  
  render(){
    if (this.props.login) {
      return (
        <Route  path={this.props.path} component={this.props.component}/>
      )
    }
    return (
      <Redirect to="/login" />
    )
  }
}

export default connect(state =>{
  return{
    login: state.loginReducer.login
  }
})(PrivateRoute)