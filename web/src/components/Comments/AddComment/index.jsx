import React from 'react'
import TextField from 'material-ui/TextField'
import Button from './../../Button'
import Paper from 'material-ui/Paper'


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
        <Paper style={{ borderRadius: "10px", padding: "10px", margin: "0 5px 0 5px", background: "linear-gradient(90deg, #6b6bcc 10%, #00c2e7 100%)" }}>
          <TextField
            fullWidth={true}
            hintText="MultiLine with rows: 2 and rowsMax: 4"
            hintStyle={{ color: "rgba(255, 255, 255, 0.3)" }}
            underlineStyle={{ borderBottom: "2px solid #FFBF00" }}
            value={this.state.value}
            onChange={this.handleChange}
            multiLine={true}
            rowsMax={4}
            textareaStyle={{ color: "white" }}
          />
          <Button label="Add Comment" style={{ float: "right", backgroundColor: "#FFBF00" }} onClick={() => {
            sendComment(this.state.value)
            this.setState({ value: "New comment" })
          }} />
        </Paper>
      </div>
    )
  }
}
