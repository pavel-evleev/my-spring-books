import React from 'react'
import IconButton from 'material-ui/IconButton'
import AddedBook from 'material-ui/svg-icons/content/add-circle'
import AddBook from 'material-ui/svg-icons/content/add-circle-outline'
import Delete from 'material-ui/svg-icons/action/delete'
import Like from 'material-ui/svg-icons/action/favorite'
import Dislike from 'material-ui/svg-icons/action/favorite-border'


class FavorDeleteButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // added: false
    }
  }


  render() {
    const { handleClickFavor, handleClickUnfavor, buttonAction, liked, countLiked, toggleLikeBook } = this.props
    return (
      <div>
        {buttonAction ? <IconButton touch={true} onClick={(e) => {
          e.stopPropagation()
          handleClickUnfavor()
        }}>
          <Delete/>
        </IconButton> : <IconButton touch={true} onClick={(e) => {
          e.stopPropagation()
          this.props.added ? handleClickUnfavor() : handleClickFavor()
        }}>
            {
              this.props.added ? (<AddedBook />) : (<AddBook />)
            }
          </IconButton>
        }
        <IconButton touch={true} onClick={(e) => {
          e.stopPropagation()
          toggleLikeBook()
        }}>
          {liked ? <Like /> : <Dislike />}
        </IconButton>
        <span style={{display: "inline"}}>{countLiked}</span>

      </div>
    )
  }
}

FavorDeleteButton.defaultProps = { edit: false }

export default FavorDeleteButton