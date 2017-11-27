import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import InputMask from 'react-input-mask'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as api from '../../services/API'
import * as ActionCreators from '../../ducks/action'

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
		api.Login(this.state.email, this.state.password)
			.then((responce) => {
				this.props.loginTrue(true)
				// this.props.history.push('/users')
				api.fetchEmail({ email: this.state.email })
					.then((responce) => {
            this.props.setCurrentUser(responce.data.id)
            console.log(responce.data.id)
						this.props.history.push('/users/my-page')
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

const mapStateToProps = (state) => {
	return{
		login: state.loginReducer.login
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
    loginTrue: bindActionCreators(ActionCreators.loginTrue, dispatch),
    setCurrentUser: bindActionCreators(ActionCreators.setCurrentUser ,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)