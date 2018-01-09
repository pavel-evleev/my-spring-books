import React from 'react'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { authorComment, text, time } = this.props.comment
    return (
      <div className="b-comment">
        <div className="a-cont">
          <div>{authorComment ? authorComment : "Author comment is here"}</div>
          <div>{time}</div>
        </div>
        <p>{text ? text : "Your comment is here......"}</p>
      </div>
    )
  }
}

Comment.defaultProps = { comment: null }

export default Comment