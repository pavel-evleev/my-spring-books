import React from 'react'

// import BookItem from '../BookItem'
import * as api from '../../services/API'

import BookItem from '../BookItem'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ActionDelete from 'material-ui/svg-icons/action/delete'
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
      <div>
        <h2 style={{}}>Books</h2>
        <div style={
          {
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "988px",
            margin: "auto"
          }
        }>
          {
            this.props.books.map((book, index) => {
              return (
                // <BookItem book={book}/>
                <Paper key={index} zDepth={2} style={
                  {
                    display: "flex",
                    flexDirection: "column",
                    width: "237px",
                    margin: "5px",
                    padding: "10px",
                    fontFamily: "Roboto, Arial"
                  }}>
                  
                  <div style={
                    {
                      margin: "10px auto 0px",
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "black",
                      height: "34px"
                    }
                  }>{book.name} not longer then 48 symbol </div>
                  <div style={{width: "150px", height: "185px", backgroundColor: "blue", margin: "15px auto"}} ></div>
                  {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
                  <div style={{margin: "0px auto" }} >{book.description}</div>
                </Paper>
              )
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