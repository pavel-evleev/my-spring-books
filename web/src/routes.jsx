import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LeftBar from './components/Home/LeftBar'
import Notifications from 'react-notify-toast'

import About from './components/About'
import Authors from './components/Authors'
import BooksPage from './components/Books/BooksWrapper'
import Book from './components/Books/BookCardContainer'
import Home from './components/Home'
import AddUser from './components/AddUser'
import AddBook from './components/AddBook'
import User from './components/User'
import Users from './components/Users'
import AddAuthor from './components/AddAuthor'
import Login from './components/Login'
import NoMatch from './routes/NoMatch'
import MyAppBar from './components/MyAppBar'
import PrivateRoute from './routes/PrivateRoute'
import AdminPrivateRoute from './routes/AdminPrivateRoute'
import SearchedBooks from './components/SearchedBooks'
import Chat from './components/Chat'

import EditBooks from './components/AdminComponents/EditBooks'
import EditBook from './components/AdminComponents/EditBooks/EditBook'
import EditAuthors from './components/AdminComponents/EditAuthors'
import EditAuthor from './components/AdminComponents/EditAuthors/EditAuthor'
import ApproveComments from './components/AdminComponents/ApproveEntity/Comments'


import Magic from './components/MagicProgress'

import Page from './components/OurPage'

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

  handleTouchTap = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <MyAppBar onLeftIconButtonTouchTap={this.handleTouchTap} />
        <LeftBar
          onClose={this.handleTouchTap}
          open={this.state.open}
        />
        <div className="route-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/registration" component={AddUser} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute path='/users/add-book' component={AddBook} />
            <PrivateRoute path='/users/conversation' component={Chat} />
            <PrivateRoute path='/users/add-author' component={AddAuthor} />
            <PrivateRoute path='/users/:userId/books/:bookId' component={Book} />
            <PrivateRoute path='/users/:userId' component={User} />
            {/* <PrivateRoute path='/authors' component={Authors} /> */}
            <PrivateRoute exact path='/books' component={BooksPage} />
            <PrivateRoute path='/books/:bookId' component={Book} />
            <PrivateRoute path='/search-books/:searchBooks' component={SearchedBooks} />
            <AdminPrivateRoute exact path='/admin/edit-books' component={EditBooks} />
            <AdminPrivateRoute path='/admin/edit-books/:bookId' component={EditBook} />
            <AdminPrivateRoute exact path='/admin/edit-authors' component={EditAuthors} />
            <AdminPrivateRoute  path='/admin/edit-authors/:authorId' component={EditAuthor} />
            <AdminPrivateRoute exact path='/admin/approve-comments' component={ApproveComments} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Notifications options={{ zIndex: 5000 }} />
      </div>
    )
  }
}