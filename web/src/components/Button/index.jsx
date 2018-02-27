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
          disabled={this.props.disabled}
          onClick={this.props.onClick} />
      </div>)
  }
}
MyButton.defaultProps={
  disabled:false
}

export default MyButton







