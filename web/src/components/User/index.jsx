import React from 'react'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../services/ducks/action'

import IconButton from 'material-ui/IconButton'
import Mail from 'material-ui/svg-icons/communication/email'
import Paper from 'material-ui/Paper'
import Books from './../Books'
import ToolBar from './../ToolBar'
import * as api from '../../services/API'

class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid",
      enable: false,
      allBooks: []
    }
  }

  componentDidMount() {
    const idCurrent = this.props.currentUserId;
    const id = parseInt(this.props.match.params.userId);

    // Load user info
    this.props.fetchUser(id);
  

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
    const { user, enable } = this.state;
    

    if (!this.props.openedUser) {
      return (<div>User not found</div>)
    }

    return (
      <div className="page">
        <ToolBar changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }} className="view-books" />
        <Paper className="user">
          <div className="user-ava">
            <div>
              <img src={require("./../../img/photo40427709_329412123.jpg")} alt="user" />
            </div>
          </div>
          <div>
            <div className="user-info">{this.props.openedUser.name}</div>
            <IconButton touch={true}
              onClick={() => { alert("click") }}>
              <Mail />
            </IconButton>
          </div>
          <div>Collection books:{this.props.openedUser.books.length}</div>
        </Paper>
        <div className="user-books">
          <Books books={this.props.openedUser.books} view={this.state.view} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUser,
    openedUser: state.openedUser
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser: ActionCreators.fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)