import React from 'react'
import Books from './../index'
import ToolBar from './../../ToolBar'
import Search from './../../Search'
import { connect } from 'react-redux'

class Page extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid"
    }
  }

  render() {
    return (
      <div>
        <ToolBar
          changeViewOnClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}
          searchComponent={<Search />} />
        <div className="user-books">
          <Books books={this.props.books} view={this.state.view} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    books: state.allBooks
  }
}
export default connect(mapStateToProps)(Page)