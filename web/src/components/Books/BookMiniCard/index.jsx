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

  deleteBook = (id) => {
  }

  truncateTitle = (title) => {
    if (title.length === MAX_LENGHT_TITLE) {
      return title.substr(0, 49) + '...'
    }
    return title
  }

  render() {
    const { book, OnClick } = this.props

    return (
      <Paper zDepth={1} onClick={() => OnClick(book.id)} className="bookMiniCard" style={{ position: "relative" }}>
        <div className="bookMiniCard-title" >{this.truncateTitle(book.name)}</div>
        <div className="bookMiniCard-img">
          {book.cover ? <img src={book.cover} alt="book" width="150" height="185" /> : <img src={require("../../../img/book.png")} alt="book" width="200" height="200" />}
        </div>
        <ActionButton />
        {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
        <div className="bookMiniCard-desc">{book.description}</div>
      </Paper>
    )
  }
}

BookMiniCard.defaultProps = { deleteBool: false }

export default BookMiniCard