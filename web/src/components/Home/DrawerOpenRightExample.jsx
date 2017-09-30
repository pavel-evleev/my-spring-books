import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router-dom'
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

  handleAddAuthorsClick = () =>{
    this.props.history.push('/add-author');
    this.handleTouchTap();
  }
  
  render() {
    return (
      <div>
      <Drawer width={200} open={this.props.open} >
        <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleTouchTap} />
        <MenuItem onClick={this.handleHomeClick}>Home</MenuItem>
        <MenuItem onClick={this.handleAboutClick} >About</MenuItem>
        <MenuItem onClick={this.handleBooksClick}>Books</MenuItem>
        <MenuItem onClick={this.handleAuthorsClick}>Authors</MenuItem>
        <MenuItem onClick={this.handleAddAuthorsClick}> Add Authors</MenuItem>
      </Drawer>
      </div>
    );
  }
}

export default withRouter(DrawerOpenRightExample)