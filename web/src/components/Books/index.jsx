import React from 'react'

import * as api from '../../services/API'
import BookCard from './BookMiniCard'
import BookListItem from './BookListView'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { withRouter } from 'react-router-dom'

/*
 * View for listing books.
 */
class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  handleOnClickBook = (id) => {
    this.props.history.push(`/books/${id}`);
  }

  render() {
    const { likedBookIds, userBooksId, books } = this.props
    const grid = this.props.view
    // Show loading bar if HTTP request is not completed
    if (this.state.booksLoading) {
      return (<div>Loading...</div>)
    }
    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }
    if (!Array.isArray(this.props.books)) {
      return (<div>Dont have books...</div>)
    }
    return (
      <div>
        <div className="book-wrapper">
          {(grid === "grid") ? (
            this.props.books.map((book) => {
              if (userBooksId.includes(book.id)) {
                return (<BookCard key={book.id} book={book}
                  added={true}
                  liked={Array.isArray(likedBookIds) ? likedBookIds.includes(book.id) : false}
                  buttonAction={this.props.enableChange}
                  toggleLikeBook={this.props.toggleLikeBook}
                  OnClick={this.handleOnClickBook}
                  addToCollection={this.props.addToCollection}
                  removeFromCollection={this.props.removeFromCollection} />)
              } else {
                return (<BookCard key={book.id} book={book}
                  added={false}
                  liked={Array.isArray(likedBookIds) ? likedBookIds.includes(book.id) : false}
                  buttonAction={this.props.enableChange}
                  toggleLikeBook={this.props.toggleLikeBook}
                  OnClick={this.handleOnClickBook}
                  addToCollection={this.props.addToCollection}
                  removeFromCollection={this.props.removeFromCollection} />)
              }
            })) : (this.props.books.map((book) => {
              if (userBooksId.includes(book.id)) {
                return (<BookListItem key={book.id} book={book}
                  added={true}
                  liked={Array.isArray(likedBookIds) ? likedBookIds.includes(book.id) : false}
                  buttonAction={this.props.enableChange}
                  toggleLikeBook={this.props.toggleLikeBook}
                  OnClick={this.handleOnClickBook}
                  addToCollection={this.props.addToCollection}
                  removeFromCollection={this.props.removeFromCollection} />)
              } else {
                return (<BookListItem key={book.id} book={book}
                  added={false}
                  liked={Array.isArray(likedBookIds) ? likedBookIds.includes(book.id) : false}
                  buttonAction={this.props.enableChange}
                  toggleLikeBook={this.props.toggleLikeBook}
                  OnClick={this.handleOnClickBook}
                  addToCollection={this.props.addToCollection}
                  removeFromCollection={this.props.removeFromCollection} />)
              }
            }))
          }
        </div>
      </div>
    )
  }
}


Books.defaultProps = {
  view: "grid",
  buttonAction: false
}
export default withRouter(Books)