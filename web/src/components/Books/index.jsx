import React from 'react'

import * as api from '../../services/API'
import BookCard from './BookMiniCard'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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

  /*
   * Load all books when component is created.
   */
  componentDidMount() {
    // this.setState({ books: [], booksLoading: false, error: null })
    // api.fetchBooks()
    //   .then((response) => {
    //     this.setState({ books: response.data, booksLoading: false })
    //   })
    //   .catch((error) => {
    //     this.setState({ books: [], booksLoading: false, error: error.toString() })
    //   })
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

  handleOnClickBook = (id) => {
    this.props.history.push(`/books/${id}`);
  }

  render() {
    const grid = this.props.view
    // Show loading bar if HTTP request is not completed
    if (this.state.booksLoading) {
      return (<div>Loading...</div>)
    }
    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }

    return (
      <div>
        <div className="book-wrapper">
          {(grid === "grid") ? (
            this.props.books.map((book) => {
              return (<BookCard key={book.id} book={book} OnClick={this.handleOnClickBook} />)
            })) : (this.props.books.map((book) => {
              return (<div style={{ width: "100%", display: "flex", margin: "5px 0" }} key={book.id}>
                <div style={{backgroundColor: "blue", width: "40px", height: "40px", margin: "0px 10px"}}>img</div>
                {book.name}
              </div>)
            }))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.allBooks
  }
}

Books.defaultProps = { view: "grid" }
export default withRouter(connect(mapStateToProps)(Books))