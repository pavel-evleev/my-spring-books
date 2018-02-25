import React from 'react'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../services/ducks/action'

import IconButton from 'material-ui/IconButton'
import Mail from 'material-ui/svg-icons/communication/email'
import Ava from 'material-ui/svg-icons/image/add-a-photo'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import ImageUploader from './../ImageUpload'
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
      open: false,
      file: null
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

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSendImg = () => {
    if (this.state.file) {
      this.props.changeAvatar(this.state.file, this.props.authorizedUser.id)
      this.setState({ open: false })
      notify.show("Image send", "success", 1500)
    } else {
      notify.show("Image didn't select", "error", 1500)
    }
  }

  handleFile = (file) => {
    this.setState({ file: file })
  }

  removeFromCollection = (bookId) => {
    this.props.removeFromCollection(this.props.authorizedUser.id, bookId)
  }

  addToCollection = (bookId) => {
    this.props.addToCollection(this.props.authorizedUser.id, bookId)
  }

  viewDelete = () => {
    return parseInt(this.props.match.params.userId) === this.props.authorizedUser.id
  }

  handleToggleBookLike = (bookId) => {
    this.props.toggleLikeBook({
      "userId": this.props.authorizedUser.id,
      "bookId": bookId
    })
  }
  render() {
    const { user, enableChange } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSendImg}
      />,
    ]
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
        <div className="view-books">
          <ToolBar className="view-toolbar" changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }} />
        </div>
        <Paper className="user">
          <div className="user-container">
            <div className="user-name grdient-effect">{userView.name}</div>
            {/* <IconButton touch={true}
              onClick={() => { alert("click") }}>
              <Mail />
            </IconButton> */}

            <div className="user-ava">
              <div className="ava">
                <img src={userView.avatar ? userView.avatar :
                  require("../../img/photo40427709_329412123.jpg")
                  // "https://myspringbooks.herokuapp.com/v1/img/user.png"
                } alt="user" />
              </div>
              {idCurrent === id ?
                <div className="change-ava">
                  <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <ImageUploader className={"imgUploaderAva"} preview={true} handleFile={this.handleFile} />
                  </Dialog>
                  <IconButton
                    onClick={this.handleOpen}>
                    <Ava />
                  </IconButton></div> : ''}

            </div>

            <div className="user-info">Collection books:{userView.books.length}</div>
          </div>
        </Paper>
        <div className="user-books">
          <Books books={userView.books}
            userBooksId={userBooksId}
            likedBookIds={this.props.likedBooksIds}
            view={this.state.view}
            enableChange={this.viewDelete()}
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
    toggleLikeBook: ActionCreators.toggleLikeBook,
    changeAvatar: ActionCreators.changeAvatar
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)