import React from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as ActionCreators from './../../../services/ducks/action'

class EditBooks extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
   this.props.getAllAuthors()
  }

  handleClickEditAuthor = (id) => {
    this.props.history.push(`/admin/edit-authors/${id}`);
  }

  render() {
    const { authors } = this.props
    return (
      <div>
        <List>
          {
            authors.map(a => <ListItem key={a.id}
              primaryText={a.name} onClick={() => this.handleClickEditAuthor(a.id)} />)
          }
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authors: state.allAuthors,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getAllAuthors: ActionCreators.adminGetAuthors,
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBooks))