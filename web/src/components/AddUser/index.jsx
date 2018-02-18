import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import InputMask from 'react-input-mask'
import * as api from '../../services/API'
import { notify } from 'react-notify-toast'

const requiredPass = "This field is required";
const nameExisted = "This name already existed";
const shortPhone = "Number phone is not correct";
const invalidEmail = "Email is not valid";

export default class AddUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      userName: '',
      userPassword: '',
      userEmail: '',
      phone: '',
      validName: '',
      validPassword: '',
      validPhone: '',
      validEmail: '',
      disabledButton: true,
      verifyEmail: false
    }
  }

  handleSubmit = () => {
    api.CreateUser(
      {
        name: this.state.userName,
        phone: this.state.phone,
        email: this.state.userEmail,
        password: this.state.userPassword
      }
    ).then((response) => {
      notify.show('User successfully add', 'success', 2000)
      this.setState({ verifyEmail: true })
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 409)
          notify.show(error.response.data.message.toString(), 'error', 2500)
      }
      notify.show(error.message.toString(), 'error')
    });
  }

  handleUserNameChange = (event) => {
    const userNameEvent = event.target.value;
    this.setState({ userName: userNameEvent, validName: '' });
    this.disabledButton(userNameEvent, undefined, undefined);
  }

  handlePasswordChange = (event) => {
    const password = event.target.value;
    if (password != '') {
      this.setState({ userPassword: password, validPassword: '' })
    }
    else {
      this.setState({ userPassword: password, validPassword: requiredPass, disabledButton: true })
    }
    this.disabledButton(undefined, password, undefined);
  }

  handleEmailChange = (event) => {
    const email = event.target.value;
    this.setState({ userEmail: email });
  }


  validateEmail = () => {
    const email = this.state.userEmail
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (email.match(mailformat) != null) {
      this.setState({ validEmail: '' });
    } else {
      this.setState({ validEmail: 'Invalid' })
    }
  }

  handlePhoneChange = (event) => {
    let numberPhone = event.target.value;
    this.setState({ phone: event.target.value });
    this.disabledButton(undefined, undefined, event.target.value);
  }

  handleBlurPhone = () => {
    if (this.state.phone.length < 17) {
      this.setState({ validPhone: shortPhone })
    }
    else {
      this.setState({ validPhone: '' })
    }
  }

  disabledButton = (name = this.state.userName, password = this.state.userPassword, phone = this.state.phone, validity = this.state.validName) => {
    const validPassword = this.state.validPassword;

    if (name == '' || password == '' || phone.length < 17) {
      this.setState({ disabledButton: true });
      return;
    }
    else if (validity.length != 0 || validPassword.length != 0) {
      this.setState({ disabledButton: true });
      return;
    }
    else
      this.setState({ disabledButton: false });
  }

  render() {
    if (this.stateverifyEmail) {
      return (<div>Check your email, we will send you an email to make sure that the mail exists. <span onClick={()=>this.props.history.push(`/`)} >main page</span></div>)
    }
    return (
      <div style={{ margin: "0 25%", display: this.state.hidden }}>
        <TextField id="name"
          hintText="Name"
          floatingLabelText="User Name"
          onChange={this.handleUserNameChange}
          value={this.state.userName}
          errorText={this.state.validName}
        />
        <br />
        <TextField hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange}
          value={this.state.userPassword}
          errorText={this.state.validPassword} />
        <br />
        <TextField hintText="Email"
          floatingLabelText="Email"
          type="Email"
          onChange={this.handleEmailChange}
          value={this.state.userEmail}
          errorText={this.state.validEmail}
          onBlur={this.validateEmail} />
        <br />
        <TextField
          floatingLabelText="Phone"
          type="text"
          value={this.state.phone}
          errorText={this.state.validPhone}>
          <InputMask mask="+375 99 999 99 99" value={this.state.phone} maskChar="" onChange={this.handlePhoneChange} onBlur={this.handleBlurPhone} />
        </TextField>
        <br />
        <RaisedButton label="Add User" disabled={this.state.disabledButton} onClick={this.handleSubmit} />
      </div>
    )
  }
}