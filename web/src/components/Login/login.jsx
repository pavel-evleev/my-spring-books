import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  static muiName = 'FlatButton';

  handleClickLogin = () => {
    this.props.history.push(`/login`)
  }

  render() {
    return (
      <FlatButton style={this.props.style} label="Login" onClick={this.handleClickLogin} />
    );
  }
}

export default withRouter(Login)