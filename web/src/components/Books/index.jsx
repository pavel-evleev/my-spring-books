import React from 'react'

// import BookItem from '../BookItem'
import * as api from '../../services/API'

import BookItem from '../BookItem'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { connect } from 'react-redux'

/*
 * View for listing books.
 */
class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // books: [],
      // booksLoading: false,
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

  calculateColumn = () => {
    const column = 250
    let result = Math.ceil((document.documentElement.clientWidth - 300) / column)
    console.log(result)
    return `repeat(${result},1fr)`
  }

  calculateRow = () => {
    const allBooks = this.props.books
    const booksInRow = 3
    const sizeRow = " 250px"
    let resultString = "50px"
    const result = Math.ceil(allBooks.length / booksInRow)
    for (let index = 0; index < result; index++) {
      resultString += sizeRow
    }

    return resultString
  }

  render() {
    // Show loading bar if HTTP request is not completed
    if (this.state.booksLoading) {
      return (<div>Loading...</div>)
    }
    console.log(this.calculateColumn())
    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }

    return (
      <div>
        <h2 style={{}}>Books</h2>
        <div style={
          {
            margin: "20px 150px",
            display: "grid",
            gridTemplateColumns: this.calculateColumn(),
            gridTemplateRows: this.calculateRow(),
            gridGap: "5px"
          }}>
          {
            this.props.books.map((book, index) => {
              return (<div key={index} style={{ backgroundColor: "blue" }}>{book}</div>)
            })
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

export default connect(mapStateToProps)(Books)