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
    this.props.removeFromCollectiom(this.props.book.id)
  }

  truncateTitle = (title) => {
    if (title.length === MAX_LENGHT_TITLE) {
      return title.substr(0, 49) + '...'
    }
    return title
  }


  render() {
    const { book, OnClick, added } = this.props

    return (
      <Paper zDepth={1} onClick={() => OnClick(book.id)} className="bookMiniCard" style={{ position: "relative" }}>
        <div className="bookMiniCard-title" >{this.truncateTitle(book.name)}</div>
        <div className="bookMiniCard-img">
          {book.cover ? <img src={book.cover} alt="book" width="170" height="200" /> : <img src={require("../../../img/book.png")} alt="book" width="200" height="200" />}
        </div>
        <ActionButton added={added} buttonAction={this.props.buttonAction} handleClickFavor={this.handleAddFavor} handleClickUnfavor={this.handleRemoveFavor} />
        {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
        <div className="bookMiniCard-desc">{book.description}</div>
      </Paper>
    )
  }
}

BookMiniCard.defaultProps = { buttonAction: false }

export default BookMiniCard