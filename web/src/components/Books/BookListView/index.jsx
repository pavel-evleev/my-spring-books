import React from 'react'

import Favorite from 'material-ui/svg-icons/toggle/star'
import Delete from 'material-ui/svg-icons/action/delete'
import PossibleFavorite from 'material-ui/svg-icons/toggle/star-border'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

/*
 * View for listing books.
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
      <Paper style={{ width: "100%", display: "flex", margin: "5px 0", padding: "10px 0" }}>
        <div style={{ backgroundColor: "blue", width: "40px", height: "40px", margin: "0px 10px" }}>img</div>
        <span style={{ maxWidth: "530px" }}>{name}</span>
        <div style={{ marginLeft: "auto", marginRight: "10px" }}>
          <IconButton touch={true} onClick={() => this.setState({ favorite: !this.state.favorite })}>
            {
              this.state.favorite ? (<Favorite />) : (<PossibleFavorite />)
            }
          </IconButton>
          <IconButton touch={true} onClick={()=>this.props.onDelete}>
            <Delete />
          </IconButton>
        </div>
      </Paper>
    )
  }
}
