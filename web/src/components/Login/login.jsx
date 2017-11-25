import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton'

export default class Login extends Component {
  constructor(props){
    super(props)
  }

  static muiName = 'FlatButton';

  handleClickLogin = ()=>{
    console.log(this.props)
    // this.props.history.push(`/login`)
  }

  render() {
    return (
      <FlatButton {...this.props} label="Login" onClick={this.handleClickLogin} />
    );
  }
}