import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { withRouter } from 'react-router-dom'


class DrawerOpenRightExample extends React.Component {

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

  handleAboutClick = ()=>{
    this.props.history.push('/about');
    this.handleTouchTap();
  }

  handleBooksClick = ()=>{
    this.props.history.push('/books');    
    this.handleTouchTap();
  }

  handleAuthorsClick = ()=>{
    this.props.history.push('/authors');    
    this.handleTouchTap();
  }

  handleAddAuthorClick = () =>{
    this.props.history.push('/add-author');
    this.handleTouchTap();
  }
  handleAddUserClick = () =>{
    this.props.history.push('/registration');
    this.handleTouchTap();
  }

  handleAddBookClick = () =>{
    this.props.history.push('/add-book');
    this.handleTouchTap();
  }

  handleUsersClick = ()=>{
    this.props.history.push('/users');
    this.handleTouchTap();
  }
  
  render() {
    return (
      <div>
      <Drawer width={200} open={this.props.open} docked={false} onRequestChange={() =>this.handleTouchTap()} >
        <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleTouchTap} />
        <MenuItem onClick={this.handleHomeClick}>Home</MenuItem>
        <MenuItem onClick={this.handleUsersClick}>Users</MenuItem>
        <MenuItem onClick={this.handleBooksClick}>Books</MenuItem>
        <MenuItem onClick={this.handleAuthorsClick}>Authors</MenuItem>
        <MenuItem
              primaryText="Add Entity"
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem onClick={this.handleAddAuthorClick}> Add Author</MenuItem>,
                <MenuItem onClick={this.handleAddUserClick}> Add User</MenuItem>,
                <MenuItem onClick={this.handleAddBookClick}> Add Book</MenuItem>
              ]}
            />
        <MenuItem onClick={this.handleAboutClick} >About</MenuItem>
      </Drawer>
      </div>
    );
  }
}

export default withRouter(DrawerOpenRightExample)