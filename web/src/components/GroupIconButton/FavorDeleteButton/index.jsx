import React from 'react'
import IconButton from 'material-ui/IconButton'
import AddedBook from 'material-ui/svg-icons/content/add-circle'
import AddBook from 'material-ui/svg-icons/content/add-circle-outline'
import Delete from 'material-ui/svg-icons/action/delete'


class FavorDeleteButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // added: false
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
          this.props.added ? handleClickUnfavor() : handleClickFavor()
        }}>
            {
              this.props.added ? (<AddedBook />) : (<AddBook />)
            }
          </IconButton>
        }
      </div>
    )
  }
}

FavorDeleteButton.defaultProps = { edit: false }

export default FavorDeleteButton