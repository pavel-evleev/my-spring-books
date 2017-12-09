import React from 'react'
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

  render() {
    const { books, edit } = this.props;
    // console.log(this.findBookById(2))
    // return null
    return (<BookCard book={this.findBookById()} />)
  }
}

const mapStateToProps = (state) => {
  console.log(state.booksReducer)
  return {
    books: state.booksReducer.allBooks
  }
}



export default connect(mapStateToProps)(BookCardContainer)