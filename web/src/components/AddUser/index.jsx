import React from 'react'
import MyTextField from './../TextField'
import Button from './../Button'
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
      validEmail: null,
      disabledButton: true,
      verifyEmail: false
    }
  }

  handleSubmit = () => {
    api.CreateUser(
      {
        name: this.state.userName,
        phone: this.state.phone.trim(),
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
    // this.validateEmail()
    this.setState({ userEmail: email });
  }


  validateEmail = () => {
    const email = this.state.userEmail
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailformat.test(email)) {
      this.setState({ validEmail: true });
      return true
    } else {
      this.setState({ validEmail: false })
      return false
    }
  }

  handlePhoneChange = (event) => {
    let numberPhone = event.target.value;
    this.setState({ phone: event.target.value });
    console.log(event.target.value.trim())
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
    if (this.state.verifyEmail) {
      return (<div>Check your email, we will send you an email to make sure that the mail exists. <span onClick={() => this.props.history.push(`/`)} >main page</span></div>)
    }
    return (
      <div style={{ display: this.state.hidden }}>
        <div className="regisration-fields">
          <MyTextField id="name"
            hintText="Name"
            floatingLabelText="User Name"
            onChange={this.handleUserNameChange}
            value={this.state.userName}
          // errorText={this.state.validName}
          />
          <MyTextField hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.userPassword}
            errorText={this.state.validPassword} />
          <MyTextField hintText="Email"
            floatingLabelText="Email"
            type="Email"
            onChange={this.handleEmailChange}
            value={this.state.userEmail}
            valid={this.state.validEmail}
            onBlur={this.validateEmail} />
          <MyTextField
            floatingLabelText="Phone"
            type="text"
            value={this.state.phone}
            errorText={this.state.validPhone}
            innerElement={<InputMask mask="+375 99 999 99 99" value={this.state.phone} maskChar="" onChange={this.handlePhoneChange} onBlur={this.handleBlurPhone} />}
          />
          <Button label="Add User" disabled={this.state.disabledButton} onClick={this.handleSubmit} />
        </div>
        <div>Your email is only needed to contact you if something goes wrong.
            We will not send you a mailing list if you did not subscribe to it.
            you can always unsubscribe from the mailing list. </div>
      </div>
    )
  }
}