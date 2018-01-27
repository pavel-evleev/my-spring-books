import React from 'react'
import ActionButton from './../GroupIconButton/FavorDeleteButton'
import Comments from './../Comments'

const com = [
  {
    id: 1,
    authorComment: "Pavel",
    text: "text comment",
    time: "12/12/2007"
  },
  {
    id: 2,
    authorComment: "Pavel",
    text: "text comment",
    time: "12/12/2007"
  },
  {
    id: 3,
    authorComment: "Pavel",
    text: "text comment",
    time: "12/12/2007"
  },
  {
    id: 4,
    authorComment: "Pavel",
    text: "text comment",
    time: "12/12/2007"
  }
]


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
    const { book, edit } = this.props;
    return (
      <div>
        <div className="book-card-container">
          <div className="book-card-img">
            <div>
              <img src={book.cover ? book.cover : require("../../img/book.png")} alt="book" width="226" height="300" />
            </div>

          </div>
          <div className="book-card-info">
            <span>Book name: {book.name}</span>
            <span>Authors: {this.groupAuthors(book.authors)}</span>
            <span>Readed: {book.readed ? book.readed : "5"}</span>
            <ActionButton />
          </div>
          <div className="book-card-description">
            {book.description}
          </div>
          <Comments className="book-comments" comments={book.comments} handleSendComment={this.props.handleSendComment} />
        </div>
      </div>
    )
  }
}

BookCard.defaultProps = { edit: false }

export default BookCard