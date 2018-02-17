import React from 'react'
import AppBar from 'material-ui/AppBar'

import RightButtons from './RightButtons'
import LoggedButton from './../Login/logged'
import { connect } from 'react-redux'

class MyAppbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <AppBar
        title="MySpringBooks"
        onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
        iconElementRight={this.props.logged ? <LoggedButton /> : <RightButtons />}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.login
  }
}


export default connect(mapStateToProps)(MyAppbar)
