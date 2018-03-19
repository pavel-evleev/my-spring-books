import React from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as ActionCreators from './../../../services/ducks/action'

import ViewAuthor from './ViewToApprove'

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
          {
            authors.map(a => <ViewAuthor key={a.id} author={a}
              patchAuthor={this.props.toggleApprove} onClick={()=>this.handleClickEditAuthor(a.id)} />)
          }
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
    toggleApprove: ActionCreators.patchAuthor
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBooks))