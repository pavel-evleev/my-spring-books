import React from 'react'
import ActionButton from './../../GroupIconButton/FavorDeleteButton'
import Paper from 'material-ui/Paper'

/*
 * View for list books.
 */
export default class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  render() {
    const { name } = this.props.book
    return (
      <Paper style={{ width: "100%", display: "flex", margin: "5px 0", padding: "10px 0" }} onClick={() => this.props.OnClick(this.props.book.id)}>
        <div style={{ backgroundColor: "blue", width: "40px", height: "40px", margin: "0px 10px" }}>img</div>
        <span style={{ maxWidth: "530px" }}>{name}</span>
        <div style={{ marginLeft: "auto", marginRight: "10px" }}>
          <ActionButton/>
        </div>
      </Paper>
    )
  }
}
