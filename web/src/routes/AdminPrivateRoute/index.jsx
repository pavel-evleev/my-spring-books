import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AdminPrivateRoute extends Component {
  render() {
    if (this.props.login && this.props.adminMod) {
      return (
        <Route path={this.props.path} component={this.props.component} />
      )
    }
    return (
      <Redirect to="/login" />
    )
  }
}

export default connect(state => {
  return {
    login: state.login,
    adminMod: state.adminMod
  }
})(AdminPrivateRoute)