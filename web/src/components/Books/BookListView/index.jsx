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
      // favorite: false
    }
  }

  handleAddFavor = () => {
    this.props.addToCollection(this.props.book.id)
  }

  handleRemoveFavor = () => {
    this.props.removeFromCollection(this.props.book.id)
  }

  handleLikeBook = () => {
    this.props.toggleLikeBook(this.props.book.id)
  }

  render() {
    const { book } = this.props
    return (
      <Paper className="list-item-radius" style={{ width: "100%", display: "flex", margin: "5px 0", padding: "10px 0" }}
        onClick={() => this.props.OnClick(this.props.book.id)}>

        <div className="sm-img">
          {book.cover ? <img src={book.cover} alt="book" width="30" height="40" />
            : <img src={require("../../../img/book.png")} alt="book" width="40" height="40" />}
        </div>
        <span style={{ maxWidth: "530px" }}>{book.name}</span>
        <div style={{ marginLeft: "auto", marginRight: "10px" }}>
          <ActionButton added={this.props.added} liked={this.props.liked}
          buttonAction={this.props.buttonAction}
          toggleLikeBook={this.handleLikeBook} 
          handleClickFavor={this.handleAddFavor} 
          handleClickUnfavor={this.handleRemoveFavor} />
        </div>
      </Paper>
    )
  }
}
