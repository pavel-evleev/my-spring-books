import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as ActionCreators from './../../../../services/ducks/action'

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'


class ApproveComments extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllComments()
  }

  handleClickEditAuthor = (id) => {
    this.props.history.push(`/admin/edit-authors/${id}`);
  }

  handleClickToggleApprove = (id) => {
    let ap = new FormData()
    ap.append('comId', id)
    this.props.toggleApprove(ap)
  }

  render() {
    const { comments } = this.props
    return (
      <div>
        {comments.map(c =>
          <div key={c.id} style={{ backgroundColor: "grey" }} >
            <Checkbox label="approve" checked={c.approve} onClick={() => this.handleClickToggleApprove(c.id)} />
            <div className="a-cont">
              <div>{c.authorComment.name ? c.authorComment.name : "Author comment is here"}</div>
              <div>{c.datePublished}</div>
            </div>
            <p>{c.text ? c.text : "Your comment is here......"}</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.allComments,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getAllComments: ActionCreators.adminGetComments,
    toggleApprove: ActionCreators.adminToggleApproveComment
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApproveComments))