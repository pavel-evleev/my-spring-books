import React from 'react'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'

import UserCard from '../UserCard'
import * as api from '../../services/API'

class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enable: false,
      user: null,
      allBooks: []
    }
  }

  componentDidMount() {
    const idCurrent = this.props.currentUserId;
    const id = parseInt(this.props.match.params.id);

    // Load user info
    api.fetchUser(id).then((response) => {
      this.setState({ user: response.data });
    });

    // Load all book for combo box
    api.fetchBooks().then((response) => {
      this.setState({ allBooks: response.data });
    });

    if (idCurrent === id) {
      this.setState({ enable: true })
    }
  }

  handleSelectBook = (event, index, value) => {
    this.setState({ selectedBooks: value });
  }

  handleAddClick = (selectedBooks) => {
    const { user } = this.state
    if (!Array.isArray(selectedBooks) || selectedBooks.length < 1) {
      return
    }

    api.addBooksToUser({ userId: user.id, ids: selectedBooks })
      .then((response) => {
        this.setState({ user: response.data })
        if (selectedBooks.length > 1) {
          notify.show('Books add', 'success', 2000)
        } else {
          notify.show('Book add', 'success', 2000)
        }
      }).catch((error) => {
        notify.show('error', 'error', 2000)
      })
  }

  handleDeleteBook = (userId, bookId) => {
    const { user } = this.state
    api.removeBookFromUser(userId, bookId)
      .then((response) => {
        user.books = user.books.filter(book => book.id != bookId);
        this.setState({ user })
        notify.show('Book removed', 'success', 2000)
      }).catch((error) => {
        notify.show("error", 'error', 2000)
      })
  }

  deleteUser = (id) => {
    api.DeleteUser(id)
      .then((response) => {
        notify.show('User delete', 'success', 2000)
        setTimeout(() => { this.props.history.push(`/users`) }, 1000)
      })
      .catch((error) => {
        notify.show('error', 'error', 2000)
      })
  }

  render() {
    const { allBooks, user, enable } = this.state;

    if (!user) {
      return (<div>User not found</div>)
    }

    return (
      <UserCard
        allBooks={allBooks}
        user={user}
        enable={enable}
        deleteBook={this.handleDeleteBook}
        deleteUser={this.deleteUser}
        handleAddClick={this.handleAddClick}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.userReducer.currentUser
  }
}

export default connect(mapStateToProps)(User)