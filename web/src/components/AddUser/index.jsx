import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as api from '../../services/API'

export default class AddUser extends React.Component{

    constructor(props){
        super(props)
        this.state={
            hidden: '',
            userName: '',
            userPassword: '',
            phone: '',
            displayResult: 'none',
            result: '',
            styleResult: 'succes'
        }

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = ()=>{
        api.CreateUser(
            {
                name: this.state.userName,
                phone: this.state.phone,
                password: this.state.userPassword 
            }).then((response)=>{
                this.setState({
                    result: "User successfully add",
                    styleResult: "succes",
                    displayResult: "block",
                    hidden: "none",
                    userName: '',
                    phone: '',
                    userPassword: ''
                });
                setTimeout(()=>{
                    this.props.history.push("/users")
                    },1001);
            }).catch((error)=>{
                this.setState({result: "not add because: "+error, styleResult: "bad"});
            });
        setTimeout(()=>{
            this.setState({
                hidden: "block",
                displayResult: "none"
            })},
            1000
        );
    }

    handleUserNameChange = (event)=>{
        this.setState({userName: event.target.value});
    }
    handlePasswordChange = (event)=>{
        this.setState({userPassword: event.target.value})
    }
    handlePhoneChange = (event)=>{
        this.setState({phone: event.target.value})
    }

    render(){
        return(
           <form>
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Name"
                floatingLabelText="User Name"
                onChange = {this.handleUserNameChange}
                value = {this.state.userName}
                />
                <br />
                <TextField hintText="Password"
                 floatingLabelText="Password"
                 type="password"
                 onChange={this.handlePasswordChange}
                 value = {this.state.userPassword}/>
                <br />
                <TextField hintText="Phone"
                 floatingLabelText="Phone"
                 type="phone"
                 onChange={this.handlePhoneChange}
                 value = {this.state.phone}/>
                <br />
                <RaisedButton label="Send" onClick={this.handleSubmit} />
                    
            </div>
            <div style={{margin: "0 25%", display: this.state.displayResult}}>
                <span className={this.state.styleResult}>{this.state.result}</span>
            </div>
           </form>
        )
    }
}