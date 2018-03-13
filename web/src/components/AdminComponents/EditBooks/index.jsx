import React from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as ActionCreators from './../../../services/ducks/action'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'


class EditBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "grid"
    }
  }

  componentDidMount() {
    this.props.adminGetBooks()
    if (this.props.genres.length === 0) {
      this.props.getAllGenres()
    }
  }

  handleClickEditBook = (id) => {
    this.props.history.push(`/admin/edit-books/${id}`);
  }

  render() {
    const { books } = this.props
    return (
      <div>
        <List>
          {
            books.map(b => <ListItem key={b.id}
              leftAvatar={<Avatar src={b.cover ? b.cover : require("./../../../img/book.png")} />}
              primaryText={b.name} onClick={() => this.handleClickEditBook(b.id)} />)
          }
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.allGenres,
    books: state.allBooks,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    adminGetBooks: ActionCreators.adminGetBooks,
    getAllGenres: ActionCreators.loadAllGenres,
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBooks))