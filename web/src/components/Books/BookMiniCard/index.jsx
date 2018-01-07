import React from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Favorite from 'material-ui/svg-icons/toggle/star'
import Delete from 'material-ui/svg-icons/action/delete'
import PossibleFavorite from 'material-ui/svg-icons/toggle/star-border'

const MAX_LENGHT_TITLE = 52

class BookMiniCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorite: false
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
        <div className="bookMiniCard-img"></div>
        <div >
          <IconButton touch={true} onClick={(e) => {
            e.stopPropagation()
            this.setState({ favorite: !this.state.favorite })
          }}>
            {
              this.state.favorite ? (<Favorite />) : (<PossibleFavorite />)
            }
          </IconButton>
          <IconButton touch={true} onClick={(e) => {
            e.stopPropagation()
            this.props.onDelete
          }}>
            <Delete />
          </IconButton>
        </div>
        {/* <div style={{ padding: "0px 10px 5px", alignSelf: "center"}}>{book.authors}</div> */}
        <div className="bookMiniCard-desc">{book.description}</div>
      </Paper>
    )
  }
}

BookMiniCard.defaultProps = { deleteBool: false }

export default BookMiniCard