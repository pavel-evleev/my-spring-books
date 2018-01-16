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
    console.log(this.props)
    let i = 0;
    return (
      <div className={className}>
        {

          comments.map((comment) => <Comment key={++i} comment={comment} />)
        }
        <AddComment handleSendComment={this.props.handleSendComment} />
      </div>
    )
  }
}
