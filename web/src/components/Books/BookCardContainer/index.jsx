import React from 'react'
import * as ActionCreators from './../../../services/ducks/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookCard from './../../BookItem'


class BookCardContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.match)
  }


  findBookById = () => {
    const id = parseInt(this.props.match.params.bookId)
    const books = this.props.books
    let i = books.length
    while (i--) {
      if(books[i].id === id){
        return books[i];
      }
    }
  }

  handleSendComment = (text) => {
    const comment = {
      bookId: parseInt(this.props.match.params.bookId),
      authorCommentId: this.props.currentUserId,
      text: text
    }
    this.props.sendComment(comment)
  }


  render() {
    const { books } = this.props;
    return (<BookCard book={this.findBookById()} handleSendComment={this.handleSendComment}/>)
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    currentUserId: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendComment: ActionCreators.addComment }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer)