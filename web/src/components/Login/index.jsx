import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import InputMask from 'react-input-mask'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress'

import * as ActionCreators from '../../services/ducks/action'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      validEmail: '',
      LoginButton: true
    }

  }
  handleRegistration = () => {
    this.props.history.push(`/registration`)
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value, validEmail: '' })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  validateEmail = () => {
    const email = this.state.email;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (email.match(mailformat) != null) {
      this.setState({ validEmail: '' });
    } else {
      this.setState({ validEmail: 'Invalid' })
    }
  }

  handleLogin = () => {
    this.props.request(this.state.email, this.state.password)
    setTimeout(() => this.props.history.push(`/users/${this.props.loginedUser}`), 1200)
  }

  render() {
    if (this.props.fetching) {
      return (<CircularProgress />)
    }

    return (
      <div style={{ margin: "auto", width: "300px" }}>
        <TextField id="name"
          hintText="Login"
          floatingLabelText="Login"
          onChange={this.handleEmailChange}
          value={this.state.email}
          errorText={this.state.validEmail}
          onBlur={this.validateEmail} />
        <br />
        <TextField hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange}
          value={this.state.password} />
        <br />
        <RaisedButton label="Login" onClick={this.handleLogin} />

        <div>
          <RaisedButton label="Registration" onClick={this.handleRegistration} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.loginReducer.fetching,
    loginedUser: state.userReducer.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    request: bindActionCreators(ActionCreators.requestLogin, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)