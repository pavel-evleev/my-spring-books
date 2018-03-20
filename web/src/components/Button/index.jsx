import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'



class MyButton extends React.Component {

  render() {
    let float = this.props.style? this.props.style.float : ''
    let backgroundColor = this.props.style ? this.props.style.backgroundColor : ''
    return (
      <div className={this.props.className} style={{ float }}>
        <RaisedButton
          buttonStyle={{ borderRadius: "10px", backgroundColor }}
          rippleStyle={{ borderRadius: "10px" }}
          style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px" }}
          overlayStyle={{ borderRadius: "10px" }}
          label={this.props.label}
          disabled={this.props.disabled}
          onClick={this.props.onClick} />
      </div>)
  }
}
MyButton.defaultProps = {
  disabled: false
}

export default MyButton







