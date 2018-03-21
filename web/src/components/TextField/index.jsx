import React from 'react'
import TextField from 'material-ui/TextField'
import Ok from 'material-ui/svg-icons/action/check-circle'
import Error from 'material-ui/svg-icons/alert/error'

class MyTextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: <Error style={{ color: "#ff2500" }} />,
      success: <Ok style={{ color: "#31da31" }} />
    }

  }

  render() {

    return (
      <div style={{ position: "relative", width: "fit-content", marginTop: "-14px" }}>
        <div style={{ position: "absolute", backgroundColor: "white", height: "34px", top: "33px", bottom: 0, right: 0, left: 0, borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px" }}></div>
        <div style={{ position: "absolute", top: "37px", right: "0" }}>
          {this.props.valid != null ?
            (this.props.valid ? this.state.success : this.state.error) : ''}
        </div>
        <TextField
          inputStyle={{ padding: "0px 5px" }}
          floatingLabelStyle={{ paddingLeft: "5px" }}
          floatingLabelFocusStyle={{ paddingLeft: "5px", color: "black" }}
          hintStyle={{ left: "5px" }}
          id={this.props.id}
          type={this.props.type}
          hintText={this.props.hintText}
          floatingLabelText={this.props.floatingLabelText}
          underlineShow={false}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.props.onBlur}
          multiLine={this.props.multiLine}
        >{this.props.innerElement}</TextField>
      </div>
    )
  }
}
MyTextField.defaultProps = {
  valid: null,
  onBlur: null,
  type: null,
  id: null,
  multiLine: false,
  floatingLabelText: null
}
export default MyTextField;