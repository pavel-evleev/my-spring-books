import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'

export default class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { comments, className } = this.props
    return (
      <div className={className}>
        {
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        }
        <AddComment />
      </div>
    )
  }
}
