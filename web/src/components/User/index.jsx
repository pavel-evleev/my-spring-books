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
      enableChange: false,
      allBooks: [],
    }
  }

  componentDidMount() {
    const idCurrent = this.props.authorizedUser.id;
    const id = parseInt(this.props.match.params.userId);
    // Load user info
    if (idCurrent !== id) {
      this.props.fetchUser(id);
    } else {
      this.setState({ enableChange: true })
      this.props.openedUserIsLoginedUser()
    }
  }

  removeFromCollection = (bookId) => {
    this.props.removeFromCollection(this.props.authorizedUser.id, bookId)
  }

  addToCollection = (bookId) => {
    this.props.addToCollection(this.props.authorizedUser.id, bookId)
  }

  handleToggleBookLike = (bookId) => {
    this.props.toggleLikeBook({
      "userId": this.props.authorizedUser.id,
      "bookId": bookId
    })
  }
  render() {
    const { user, enableChange } = this.state;

    const idCurrent = this.props.authorizedUser.id;
    const id = parseInt(this.props.match.params.userId);
    let userView = ''
    if (idCurrent !== id) {
      userView = this.props.openedUser
    } else {
      userView = this.props.authorizedUser
    }

    let userBooksId = '';
    if (this.props.authorizedUser && Array.isArray(this.props.authorizedUser.books)) {
      userBooksId = this.props.authorizedUser.books.map(book => book.id)
    }

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
            <div className="user-info">{userView.name}</div>
            <IconButton touch={true}
              onClick={() => { alert("click") }}>
              <Mail />
            </IconButton>
          </div>
          <div>Collection books:{userView.books.length}</div>
        </Paper>
        <div className="user-books">
          <Books books={userView.books}
            userBooksId={userBooksId}
            likedBookIds={this.props.likedBooksIds}
            view={this.state.view}
            enableChange={this.state.enableChange}
            removeFromCollection={this.removeFromCollection}
            addToCollection={this.addToCollection}
            toggleLikeBook={this.handleToggleBookLike} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authorizedUser: state.authorizedUser,
    openedUser: state.openedUser,
    likedBooksIds: state.likedBooksIds
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    fetchUser: ActionCreators.fetchUser,
    openedUserIsLoginedUser: ActionCreators.openedIsLogined,
    removeFromCollection: ActionCreators.removeFromCollection,
    addToCollection: ActionCreators.addToCollection,
    toggleLikeBook: ActionCreators.toggleLikeBook
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)