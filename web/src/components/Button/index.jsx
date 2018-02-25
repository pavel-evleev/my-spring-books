import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'



class MyButton extends React.Component {

  render() {
    return (
      <div className={this.props.className}>
        <RaisedButton
          buttonStyle={{ borderRadius: "10px" }}
          rippleStyle={{ borderRadius: "10px" }}
          style={{ borderRadius: "10px" }}
          overlayStyle={{ borderRadius: "10px" }}
          label={this.props.label}
          onClick={this.props.onClick} />
      </div>)
  }
}
export default MyButton







