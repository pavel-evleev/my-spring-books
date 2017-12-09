import React from 'react'
import Paper from 'material-ui/Paper'
import ActionDelete from 'material-ui/svg-icons/action/delete'

const MAX_LENGHT_TITLE = 52

class BookMiniCard extends React.Component {

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
      <Paper zDepth={1} onClick={() => OnClick(book.id)} className="bookMiniCard">
        <div className="bookMiniCard-title" >{this.truncateTitle(book.name)}</div>
        <div className="bookMiniCard-img"></div>
        {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
        <div className="bookMiniCard-desc">{book.description}</div>
      </Paper>
    )
  }
}

BookMiniCard.defaultProps = { deleteBool: false }

export default BookMiniCard