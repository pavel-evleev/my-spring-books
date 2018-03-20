import React from 'react'
import AppBar from 'material-ui/AppBar'

import FlatButton from 'material-ui/FlatButton'
import LoginButton from './../../Login/login'
import LoggedButton from './../../Login/logged'
import IconButton from 'material-ui/IconButton'
import RegistrationIcon from 'material-ui/svg-icons/action/assignment-ind'

import { withRouter } from 'react-router-dom'

class MyAppbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static muiName = 'FlatButton';

  handleClickRegistration = () => {
    this.props.history.push(`/registration`)
  }

  render() {
    return (
      <span>
        <LoginButton style={this.props.style} />
        <FlatButton className="btn-registration" style={this.props.style} label="Registration" onClick={this.handleClickRegistration} />
        <IconButton className="btn-registration-icon" touch={true} onClick={this.handleClickRegistration} ><RegistrationIcon /></IconButton>
      </span>
    )
  }
}


export default withRouter(MyAppbar)
