import React from 'react'
import Books from './../index'
import ToolBar from './../../ToolBar'
import Search from './../../Search'
import Progress from './../../MagicProgress'
import * as ActionCreators from './../../../services/ducks/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Page extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid"
    }
  }

  componentDidMount() {
    this.props.getBooks()
  }

  addToCollection = (bookId) => {
    this.props.addToCollection(this.props.currentUser.id, bookId)
  }



  render() {
    console.log("Page")
    console.log(this.props)
    let userBooksId = '';
    if(this.props.currentUser && Array.isArray(this.props.currentUser.books)){
      userBooksId = this.props.currentUser.books.map(book => book.id)
    }
    let filteredBooks = Array.isArray(this.props.books)
      ? this.props.books.filter(book => !userBooksId.includes(book.id)) : this.props.books
    return (
      <div>
        <ToolBar
          changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}
          searchComponent={<Search />} />
        <div className="user-books">
          {this.props.fetching ? <Progress /> : <Books books={filteredBooks} view={this.state.view}
            addToCollection={this.addToCollection} removeFromCollectiom={this.removeFromCollectiom} />}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    currentUser: state.currentUser,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getBooks: ActionCreators.getBooks,
    addToCollection: ActionCreators.addToCollection,
    
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Page)