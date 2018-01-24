import React from 'react'

import * as api from '../../services/API'
import BookCard from './BookMiniCard'
import BookListItem from './BookListView'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../services/ducks/action'
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

  componentDidMount() {
    this.props.getBooks()
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
    if(!Array.isArray(this.props.books)){
      return(<div>Dont have books...</div>)
    }

    return (
      <div>
        <div className="book-wrapper">
          {(grid === "grid") ? (
            this.props.books.map((book) => {
              return (<BookCard key={book.id} book={book} OnClick={this.handleOnClickBook} />)
            })) : (this.props.books.map((book) => {
              return (<BookListItem key={book.id} book={book} OnClick={this.handleOnClickBook} />)
            }))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    currentUserId: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getBooks: ActionCreators.getBooks }, dispatch)

Books.defaultProps = { view: "grid" }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books))