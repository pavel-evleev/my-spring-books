import React from 'react'
import TextField from 'material-ui/TextField'

import Button from './../../../Button'
import Checkbox from 'material-ui/Checkbox'

class ViewAuthor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: null
    }
  }

  defaultValueCheck = () => {
    if (this.state.checked !== null)
      return this.state.checked
    return this.props.author.approve
  }

  updateCheck = (e, b) => {
    this.setState({ checked: b });
    this.handleSubmit()
  }

  handleSubmit = () => {
    const patch = new FormData()
    patch.append('authorId', this.props.author.id)
    patch.append('approve', !this.props.author.approve)
    this.props.patchAuthor(patch)
  }

  render() {
    const { author } = this.props;
    console.log(author)
    return (
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div onClick={()=>this.props.onClick()}>
          {author.name}
        </div>
        <div>
          <Checkbox label="approve" checked={this.defaultValueCheck()} onCheck={this.updateCheck} />
        </div>
      </div>
    )
  }
}


export default ViewAuthor