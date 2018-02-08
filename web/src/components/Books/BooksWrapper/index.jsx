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

  removeFromCollectiom = (bookId) => {
    this.props.removeFromCollectiom(this.props.currentUser.id, bookId)
  }

  handleToggleBookLike = (bookId) => {
    this.props.toggleLikeBook({
      "userId": this.props.currentUser.id,
      "bookId": bookId
    })
  }

  render() {
    let userBooksId = '';
    if (this.props.currentUser && Array.isArray(this.props.currentUser.books)) {
      userBooksId = this.props.currentUser.books.map(book => book.id)
    }
    return (
      <div>
        <ToolBar
          changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}
          searchComponent={<Search />} />
        <div className="user-books">
          {this.props.fetching ? <Progress /> : <Books books={this.props.books} userBooksId={userBooksId} view={this.state.view}
            addToCollection={this.addToCollection} removeFromCollectiom={this.removeFromCollectiom} toggleLikeBook={this.handleToggleBookLike} likedBookIds={this.props.likedBooksIds} />}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    currentUser: state.currentUser,
    fetching: state.fetching,
    likedBooksIds: state.likedBooksIds
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getBooks: ActionCreators.getBooks,
    addToCollection: ActionCreators.addToCollection,
    removeFromCollectiom: ActionCreators.removeFromCollectiom,
    toggleLikeBook: ActionCreators.toggleLikeBook
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Page)