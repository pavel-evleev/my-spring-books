import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import LoginIcon from 'material-ui/svg-icons/communication/vpn-key'
import IconButton from 'material-ui/IconButton'
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
      <span>
        <FlatButton className="btn-login" style={this.props.style} label="Login" onClick={this.handleClickLogin} />
        <IconButton className="btn-login-icon" touch={true} onClick={this.handleClickLogin}>
          <LoginIcon />
        </IconButton>
      </span>
    );
  }
}

export default withRouter(Login)