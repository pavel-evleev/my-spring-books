import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as LoggedAction from '../../services/ducks/action'
import * as api from './../../services/API'


class Logged extends Component {
  constructor(props) {
    super(props)
  }


  loggoutHandle = () => {
    debuggers
    const user = { id: this.props.user.id, name: this.props.user.name }
    this.props.loggoutUser(user)
    this.props.history.push('/')
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={this.loggoutHandle} />
      </IconMenu>
    )
  }

}

const mapStateToProps = (state) => {
  return { user: state.currentUser }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loggoutUser: LoggedAction.loggoutUser }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logged))