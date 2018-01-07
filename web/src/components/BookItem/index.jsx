import React from 'react'
import ActionButton from './../GroupIconButton/FavorDeleteButton'
import { connect } from 'react-redux'



/**
 * Simple book list item.
 */
class BookCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  handleDeleteBook = () => {
    this.props.deleteBook();
  }

  groupAuthors = (authors) => {
    if (Array.isArray(authors)) {
      return authors.join(', ')
    }
    return authors
  }

  render() {
    const { book, edit, expandable, expButton } = this.props;
    return (
      <div>
        <div className="book-card-container">
          <div className="book-card-img">
            <div>
              <img src={require("./../../img/123123.jpg")} alt="book" width="226" height="300" />
            </div>

          </div>
          <div className="book-card-info">
            <span>Book name: {book.name}</span>
            <span>Authors: {this.groupAuthors(book.authors)}</span>
            <span>Readed: {book.readed ? book.readed : "5"}</span>
            <ActionButton/>
          </div>
          <div className="book-card-description">
            {book.description}
          </div>
        </div>
      </div>
    )
  }
}

BookCard.defaultProps = { edit: false, expandable: false, expButton: false }

export default BookCard