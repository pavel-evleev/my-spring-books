import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


export default class AddComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Property Value',
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const sendComment = this.props.handleSendComment
    return (
      <div>
        <TextField
          fullWidth={true}
          hintText="MultiLine with rows: 2 and rowsMax: 4"
          value={this.state.value}
          onChange={this.handleChange}
          multiLine={true}
          rowsMax={4}
        />
        <RaisedButton backgroundColor="#a4c639" label="Add Comment" style={{ float: "right" }} onClick={()=>sendComment(this.state.value)} />
      </div>
    )
  }
}
