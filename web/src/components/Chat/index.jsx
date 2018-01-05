import React from 'react'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'

class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid",
      enable: false,
      user: null,
      allBooks: []
    }
  }

  render() {
    return (
      <div className="chat">
        <div className="chat-list">

        </div>
        <div className="conversation">

        </div>
        <div className="box-message">

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUser,
    converations: state.converations
  }
}

export default connect(mapStateToProps)(Chat)