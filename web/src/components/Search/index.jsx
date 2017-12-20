import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: ""
    }
  }

  render() {
    return (
      <div style={{ height: "48px" }}>
        <TextField name="search" value={this.state.searchText}
          onChange={(event) => this.setState({ searchText: event.target.value })} />
        <IconButton>
          <SearchIcon onClick={() => this.props.history.push(`/search-books/${this.state.searchText}`)} />
        </IconButton>
      </div>
    )
  }

}


export default withRouter(Search)