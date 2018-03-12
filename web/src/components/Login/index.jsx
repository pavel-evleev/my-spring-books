import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Button from './../Button'
import TextField from 'material-ui/TextField'
import MyTextField from './../TextField'
import InputMask from 'react-input-mask'
import { Redirect } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Ok from 'material-ui/svg-icons/action/check-circle'
import Error from 'material-ui/svg-icons/alert/error'
import Progress from './../MagicProgress'
import * as axios from './../../services/API'


import * as ActionCreators from '../../services/ducks/action'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      validEmail: null,
      LoginButton: true,
      error: <Error style={{ color: "#ff2500" }} />,
      success: <Ok style={{ color: "#31da31" }} />
    }

  }

  componentDidMount() {
    this.props.recaptAccess()
  }

  handleRegistration = () => {
    this.props.history.push(`/registration`)
  }

  handleEmailChange = (event) => {
    this.validateEmail()
    this.setState({ email: event.target.value, validEmail: '' })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  validateEmail = () => {
    const email = this.state.email;
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailformat.test(email)) {
      this.setState({ validEmail: true });
      return true
    } else {
      this.setState({ validEmail: false })
      return false
    }
  }

  handleLogin = () => {
    this.validateEmail() ?
      this.props.request(this.state.email, this.state.password) : ""
  }

  render() {
    if (this.props.fetching) {
      return (<div><Progress /><div className="spinner-center" style={{ marginTop: "100px" }}>Please wait, when server is start.</div></div>)
    }

    if (this.props.loginedUser) {
      return <Redirect to={`/users/${this.props.loginedUser.id}`} />
    }

    return (
      <div style={{ margin: "auto", width: "290px" }}>
        <div className="container-flex" >
          <MyTextField id="name"
            hintText="Login"
            floatingLabelText="Login"
            onChange={this.handleEmailChange}
            value={this.state.email}
            onBlur={this.validateEmail}
            valid={this.state.validEmail}
          />
          <MyTextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <Button className="item-flex" label="Login" onClick={this.handleLogin} />
          <Button className="item-flex" label="Registration" onClick={this.handleRegistration} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.fetching,
    loginedUser: state.authorizedUser,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    request: ActionCreators.requestLogin,
    recaptAccess: ActionCreators.loginFromRefreshToken
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)