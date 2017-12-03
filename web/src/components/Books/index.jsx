import React from 'react'

// import BookItem from '../BookItem'
import * as api from '../../services/API'

import BookItem from '../BookItem'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'


/*
 * View for listing books.
 */
export default class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      booksLoading: false,
      error: null
    }
  }

  /*
   * Load all books when component is created.
   */
  componentDidMount() {
    this.setState({ books: [], booksLoading: true, error: null })
    api.fetchBooks()
      .then((response) => {
        this.setState({ books: response.data, booksLoading: false })
      })
      .catch((error) => {
        this.setState({ books: [], booksLoading: false, error: error.toString() })
      })
  }


  deleteBook = (id) => {
    api.DeleteBook(id)
      .then((response) => {
        if (response.status < 299) {
          let tmp = this.state.books;
          let v = 0;
          tmp.forEach((books, index) => {
            if (books.id == id)
              v = index;
          });
          tmp.splice(v, 1);
          this.setState({ books: tmp });
        }
      });
  }

  render() {
    // Show loading bar if HTTP request is not completed
    if (this.state.booksLoading) {
      return (<div>Loading...</div>)
    }

    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }

    return (
      <div style={{ margin: "0 25%" }}>
        <h2>Books</h2>
        {
          this.state.books.map((book, index) => {
            return (<BookItem key={index} book={book} deleteBook={() => this.deleteBook(book.id)} />)
          })
        }
      </div>
    )
  }
}