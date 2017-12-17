import React from 'react'
import AppBar from 'material-ui/AppBar'

import FlatButton from 'material-ui/FlatButton'
import LoginButton from './../../Login/login'
import LoggedButton from './../../Login/logged'
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
      <div>
        <LoginButton style={this.props.style}/>
        <FlatButton style={this.props.style} label="Registration" onClick={this.handleClickRegistration} />
      </div>
    )
  }
}


export default withRouter(MyAppbar)
