import React from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as ActionCreators from './../../../services/ducks/action'

import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
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

  handleClickApproveBook = (b) => {
    const patch = new FormData()
    patch.append('bookId', b.id)
    patch.append('approve', !b.approve)
    this.props.patchBook(patch)
  }

  render() {
    const { books } = this.props
    return (
      <div>
        <List>
          {
            books.map(b => <ListItem key={b.id}
              rightAvatar={<Avatar src={b.cover ? b.cover : require("./../../../img/book.png")}  onClick={() => this.handleClickEditBook(b.id)} />}
              primaryText={b.name} leftCheckbox={<Checkbox defaultChecked={b.approve} onCheck={() => this.handleClickApproveBook(b)} />} />)
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
    patchBook: ActionCreators.patchBook
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBooks))