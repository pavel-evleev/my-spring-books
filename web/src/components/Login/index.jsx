import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import InputMask from 'react-input-mask'
import * as api from '../../services/API'
import { notify } from 'react-notify-toast'

export default class Login extends React.Component {
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
		localStorage.setItem("isLoggedIn", true);
		api.Login(this.state.email, this.state.password)
			.then((responce) => {
				localStorage.setItem("isLoggedIn", true);
				api.fetchEmail({ email: this.state.email })
					.then((responce) => {
						console.log(responce.data.id);
						this.props.history.push(`/user/${responce.data.id}`)
					})
			})
	}

	render() {
		return (
			<div>
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