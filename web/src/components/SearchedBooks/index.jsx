import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Books from './../Books'
import ToolBar from './../ToolBar'
import Search from './../Search'
import CircularProgress from './../MagicProgress'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../services/ducks/action'

class SearchedBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid"
    }
  }
  componentDidMount() {
    const searchQuery = this.props.match.params.searchBooks
    // this.props.searchBooksRequest(searchQuery)
  }

  render() {
    const { fetching, error, searchedBooks } = this.props
    if (fetching) {
      return (<CircularProgress />)
    }
    if (error) {
      return (<div>{error}</div>)
    }

    return (
      <div>
        <ToolBar
          changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}
          searchComponent={<Search />} />
        <div className="user-books">
          {
            (searchedBooks)
              ? (<Books books={searchedBooks} view={this.state.view} />)
              : (<div>
                <div>Sorry, we have not this book. Would you want add this book?</div>
                <FloatingActionButton mini={true} onClick={()=>this.props.history.push("/users/add-book")}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>)
          }

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    searchedBooks: state.searchedBooks,
    error: state.error,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ searchBooksRequest: ActionCreators.searchBooksRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchedBooks)