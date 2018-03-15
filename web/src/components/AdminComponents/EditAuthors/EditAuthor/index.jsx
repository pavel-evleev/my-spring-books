import React from 'react'
import TextField from 'material-ui/TextField'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../../../services/ducks/action'
import Button from './../../../Button'
import Checkbox from 'material-ui/Checkbox'
import Progress from './../../../MagicProgress'

class EditAuthor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nameAuthor: null,
      checked: null
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.authorId)
    this.props.getAuthor(id)
  }

  handleNameChange = (event) => {
    this.setState({ nameAuthor: event.target.value });
  }


  defaultValueIfNotExistName = () => {
    if (this.state.nameAuthor !== null) {
      return this.state.nameAuthor
    } else return this.props.author.name
  }

  defaultValueCheck = () => {
    if (this.state.checked !== null)
      return this.state.checked
    return this.props.author.approve
  }

  updateCheck = (e, b) => {
    this.setState({ checked: b });
  }

  handleSubmit = () => {
    const patch = new FormData()
    patch.append('authorId', this.props.author.id)
    if (this.state.nameAuthor !== null) {
      patch.append('newName', this.state.nameAuthor)
    }
    if (this.state.checked !== null) {
      console.log(this.state.checked)
      patch.append('approve', this.state.checked)
    }
    debugger
    this.props.patchAuthor(patch)
  }

  render() {
    const { author } = this.props;

    if (author === null || !author) { return (<Progress />) }
    return (
      <div>

        <div>
          <TextField floatingLabelText="Author name" hintText="Author name"
            value={this.defaultValueIfNotExistName()} onChange={this.handleNameChange} />
        </div>
        <div>
          <Checkbox label="approve" checked={this.defaultValueCheck()} onCheck={this.updateCheck} />
        </div>
        <Button className="item-flex" label="Submit" onClick={this.handleSubmit} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    author: state.openAuthor,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getAuthor: ActionCreators.getAuthor,
    patchAuthor: ActionCreators.patchAuthor
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor)