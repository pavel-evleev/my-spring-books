import React from 'react'
import IconButton from 'material-ui/IconButton'
import Favorite from 'material-ui/svg-icons/toggle/star'
import PossibleFavorite from 'material-ui/svg-icons/toggle/star-border'
import Delete from 'material-ui/svg-icons/action/delete'


class FavorDeleteButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  render() {
    const { handleClickFavor, handleClickUnfavor, buttonAction } = this.props
    return (
      <div>
        {buttonAction ? <IconButton touch={true} onClick={(e) => {
          e.stopPropagation()
          handleClickUnfavor()
        }}>
          <Delete />
        </IconButton> : <IconButton touch={true} onClick={(e) => {
          e.stopPropagation()
          this.state.favorite ? handleClickUnfavor() : handleClickFavor()
          this.setState({ favorite: !this.state.favorite })
        }}>
            {
              this.state.favorite ? (<Favorite />) : (<PossibleFavorite />)
            }
          </IconButton>
        }
      </div>
    )
  }
}

FavorDeleteButton.defaultProps = { edit: false }

export default FavorDeleteButton