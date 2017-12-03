import React from 'react'
import AppBar from 'material-ui/AppBar'

import LoginButton from './../Login/login'
import LoggedButton from './../Login/logged'
import { connect } from 'react-redux'

class MyAppbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    // console.log(this.props)
    return (
      <AppBar
        title="MySpringBooks"
        onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
        iconElementRight={this.props.logged ? <LoggedButton /> : <LoginButton />}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.loginReducer.login
  }
}


export default connect(mapStateToProps)(MyAppbar)
