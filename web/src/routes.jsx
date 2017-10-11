import React from 'react'
import {Route} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import DrawerOpenRightExample from './components/Home/DrawerOpenRightExample'

import About from './components/About'
import Books from './components/Books'
import Home from './components/Home'
import Authors from './components/Authors'
import Users from './components/Users'
import AddAuthor from './components/AddAuthor'
import AddUser from './components/AddUser'
import AddBook from './components/AddBook'
import User from './components/User'
import {
  ToastContainer,
  ToastMessage,
} from 'react-toastr'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
/**
 * Hash url router.
 * Connect components with browser url links.
 */
export default class Routes extends React.Component {
 
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  addAlert = this.addAlert.bind(this);
  clearAlert = this.clearAlert.bind(this);

  addAlert() {
    this.refs.container.success(`hi! Now is ${new Date()}`, `///title\\\\\\`, {
      closeButton: true,
    });
  }

  clearAlert() {
    this.refs.container.clear();
  }

  handleTouchTap = () => {
    this.setState({ open: !this.state.open})
  }

 
  render() {
    return (
      <div>
        <AppBar
          title="Title"
          onLeftIconButtonTouchTap={this.handleTouchTap}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <DrawerOpenRightExample
          onClose={this.handleTouchTap}
          open={this.state.open}
        />
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/users" component={Users}/>
            <Route path="/books" component={Books}/>
            <Route path="/authors" component={Authors} />
            <Route path="/add-author" component={AddAuthor} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/user/:id" component={User} />
          </div>

          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
          />

        <h1>
          React-Toastr
          <small>React.js toastr component</small>
        </h1>

        <div className="btn-container">
          <button className="primary" onClick={this.addAlert}>
            Hello
          </button>
          <button className="primary" onClick={this.clearAlert}>
            CLEAR
          </button>
        </div>

      </div>
    )
  }
}