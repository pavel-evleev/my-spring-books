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
    return (
      <div className={className}>
        {
          comments.map((c, index) => <Comment key={index} comment={c} />)
        }
        <AddComment handleSendComment={this.props.handleSendComment} />
      </div>
    )
  }
}
