import React from 'react'
import Paper from 'material-ui/Paper'
import ActionButton from './../../GroupIconButton/FavorDeleteButton'


const MAX_LENGHT_TITLE = 52

class BookMiniCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  truncateTitle = (title) => {
    if (title.length === MAX_LENGHT_TITLE) {
      return title.substr(0, 49) + '...'
    }
    return title
  }


  render() {
    const { book, OnClick, added, liked } = this.props

    return (
      <Paper zDepth={3} onClick={() => OnClick(book.id)}
        className="bookMiniCard" style={{ position: "relative" }}>
        <div className="bookMiniCard-title" >{this.truncateTitle(book.name)}</div>
        <div className="bookMiniCard-img">
          {book.cover ? <img src={book.cover} alt="book" width="140" height="170" className="castomImg" />
            : <img src={require("../../../img/book.png")} className="preview-default" alt="book" />}
        </div>
        <ActionButton added={added} liked={liked}
          buttonAction={this.props.buttonAction}
          toggleLikeBook={this.handleLikeBook}
          handleClickFavor={this.handleAddFavor}
          handleClickUnfavor={this.handleRemoveFavor}
          countLiked={book.rating} />
        {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
        <div className="bookMiniCard-desc">{book.description}</div>
      </Paper>
    )
  }
}

BookMiniCard.defaultProps = { buttonAction: false }

export default BookMiniCard