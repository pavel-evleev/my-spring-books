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


  render() {
    return (
      <div>
        <ToolBar
          changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}
          searchComponent={<Search />} />
        <div className="user-books">
          {this.props.fetching ? <Progress /> : <Books books={this.props.books} view={this.state.view} />}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    currentUserId: state.currentUser,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getBooks: ActionCreators.getBooks }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Page)