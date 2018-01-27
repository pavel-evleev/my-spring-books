import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import InputMask from 'react-input-mask'
import { Redirect } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress'
import * as axios from './../../services/API'

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
  }

  render() {
    if (this.props.fetching) {
      return (<CircularProgress />)
    }

    if (this.props.loginedUser) {
      return <Redirect to={`/users/${this.props.loginedUser.id}`} />
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
    fetching: state.fetching,
    loginedUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ request: ActionCreators.requestLogin }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)