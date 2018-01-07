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
    return (
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
    )
  }
}

FavorDeleteButton.defaultProps = { edit: false }

export default FavorDeleteButton