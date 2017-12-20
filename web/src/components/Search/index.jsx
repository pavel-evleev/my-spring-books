import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'

export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div style={{height: "48px"}}>
        <TextField name="search"/>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
    )
  }

}
