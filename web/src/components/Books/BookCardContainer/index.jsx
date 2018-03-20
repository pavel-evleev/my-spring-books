import React from 'react'
import * as ActionCreators from './../../../services/ducks/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookCard from './../../BookItem'
import Spinner from './../../MagicProgress'


class BookCardContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.bookId)
    this.props.getBookById(id)
  }

  handleSendComment = (text) => {
    const comment = {
      bookId: parseInt(this.props.match.params.bookId),
      authorCommentId: this.props.authorizedUserId,
      text: text
    }
    this.props.sendComment(comment)
  }

  handleRemoveFromCollection = () => {
    this.props.removeFromCollection(this.props.authorizedUserId, this.props.book.id)
  }

  handleAddToCollection = () => {
    this.props.addToCollection(this.props.authorizedUserId, this.props.book.id)
  }

  handleToggleLikeBook = () => {
    const l = { userId: this.props.authorizedUserId, bookId: this.props.book.id }
    this.props.toggleLikeBook(l)
  }

  isAdded = () => {
    return this.props.userBooksId.includes(this.props.book.id)
  }

  isLiked = () => {
    return this.props.likedBooksIds.includes(this.props.book.id)
  }
  render() {
    const { book } = this.props;
    if (book === null || !book)
      return (<Spinner />)
    return (<BookCard book={book}
      added={this.isAdded()} liked={this.isLiked()}
      handleSendComment={this.handleSendComment}
      handleToggleLikeBook={this.handleToggleLikeBook}
      handleAddToCollection={this.handleAddToCollection}
      handleRemoveFromCollection={this.handleRemoveFromCollection} />)
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.openedBook,
    authorizedUserId: state.authorizedUser.id,
    likedBooksIds: state.likedBooksIds,
    userBooksId: state.authorizedUser.books.map((book) => book.id)
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    sendComment: ActionCreators.addComment,
    getBookById: ActionCreators.getBookById,
    removeFromCollection: ActionCreators.removeFromCollection,
    addToCollection: ActionCreators.addToCollection,
    toggleLikeBook: ActionCreators.toggleLikeBook
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer)