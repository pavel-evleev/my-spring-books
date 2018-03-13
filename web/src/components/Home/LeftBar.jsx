import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import Toggle from 'material-ui/Toggle'
import * as ActionCreators from './../../services/ducks/action'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class LeftBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }

  handleTouchTap = () => {
    this.props.onClose();
  }

  handleHomeClick = () => {
    this.props.history.push('/');
    this.handleTouchTap();
  }

  handleAboutClick = () => {
    this.props.history.push('/about');
    this.handleTouchTap();
  }

  handleBooksClick = () => {
    this.props.history.push('/books');
    this.handleTouchTap();
  }

  handleAddBookClick = () => {
    this.props.history.push('/users/add-book');
    this.handleTouchTap();
  }

  handleUsersClick = () => {
    this.props.history.push('/users');
    this.handleTouchTap();
  }

  handleMyPageClick = () => {
    this.props.history.push(`/users/${this.props.loginedUser}`);
    this.handleTouchTap();
  }

  handleAdminEditBooksClick = () => {
    this.props.history.push(`/admin/edit-books`);
    this.handleTouchTap();
  }

  

  handleToggleAdminMod = (event, select) => {
    this.props.toggleAdminMod(select);
  }

  handleAdminMod = () => {
    if (this.props.isAdmin)
      return (<MenuItem>
        <div style={{ paddingTop: "10px" }}>
          <Toggle
            label="Admin Mod"
            defaultToggled={this.props.adminMod}
            onToggle={this.handleToggleAdminMod}
            labelPosition="right"
          /></div></MenuItem>)
    return
  }

  adminMenu = () => {
    return (
      <div>
        <MenuItem onClick={this.handleAdminEditBooksClick}>Edit books</MenuItem>
        {/* <MenuItem onClick={''}>Edit users</MenuItem>
        <MenuItem onClick={''}>Edit authors</MenuItem>
        <MenuItem onClick={''}>Edit genres</MenuItem>
        <MenuItem onClick={''}>Approve Books</MenuItem>
        <MenuItem onClick={''}>Approve comments</MenuItem> */}
      </div>
    )
  }


  render() {
    if (this.props.login) {
      return (
        <Drawer width={200} open={this.props.open} docked={false} onRequestChange={() => this.handleTouchTap()} >
          <AppBar className="grdient-effect" title="Menu" onLeftIconButtonTouchTap={this.handleTouchTap} />
          <MenuItem onClick={this.handleHomeClick}>Home</MenuItem>
          <MenuItem onClick={this.handleMyPageClick}>My page</MenuItem>
          <MenuItem onClick={this.handleUsersClick}>Users</MenuItem>
          <MenuItem onClick={this.handleBooksClick}>Books</MenuItem>
          <MenuItem onClick={this.handleAddBookClick}> Add Book</MenuItem>
          <MenuItem onClick={this.handleAboutClick} >About</MenuItem>
          {
            this.handleAdminMod()
          }
          {
            this.props.adminMod ? this.adminMenu() : ''
          }
        </Drawer>
      );
    }

    return (
      <Drawer width={200} open={this.props.open} docked={false} onRequestChange={() => this.handleTouchTap()} >
        <AppBar className="grdient-effect" title="Menu" onLeftIconButtonTouchTap={this.handleTouchTap} />
        <MenuItem onClick={this.handleHomeClick}>Home</MenuItem>
        <MenuItem onClick={this.handleAboutClick} >About</MenuItem>
      </Drawer>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    loginedUser: state.authorizedUser ? state.authorizedUser.id : '',
    isAdmin: state.authorizedUser ? state.authorizedUser.omnipotent : false,
    adminMod: state.adminMod
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ toggleAdminMod: ActionCreators.toggleAdminMod }, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftBar))