import React from 'react'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

/*
 * View for listing books.
 */
export default class Books extends React.Component {
  render() {
    const { name } = this.props.book
    return (
      <Paper style={{ width: "100%", display: "flex", margin: "5px 0", padding: "10px 0" }}>
          <div style={{ backgroundColor: "blue", width: "40px", height: "40px", margin: "0px 10px" }}>img</div>
          {name}
      </Paper>
    )
  }
}
