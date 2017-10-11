import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import InputMask from 'react-input-mask'
import * as api from '../../services/API'
import Snackbar from 'material-ui/Snackbar'

const requiredPass = "This field is required";
const nameExisted = "This name already existed"; 
const shortPhone = "Number phone is not correct";

export default class AddUser extends React.Component{

    constructor(props){
        super(props)
        this.state={
            users: [],
            userName: '',
            userPassword: '',
            phone: '',
            message: '',
            validName: '',
            validPassword: '',
            validPhone: '',
            disabledButton: true,
            open: false
        }
    }

    
    handleSubmit = ()=>{
        api.CreateUser(
            {
                name: this.state.userName,
                phone: this.state.phone,
                password: this.state.userPassword 
            }).then((response)=>{
                this.setState({
                    message: "User successfully add",
                    userName: '',
                    phone: '',
                    userPassword: '',
                    open: true
                });
                setTimeout(()=>{
                    this.props.history.push(`/user/${response.data.id}`)
                    },1001);
            }).catch((error)=>{
                this.setState({message: "not add because: " + error});
            });
    }

    handleUserNameChange = (event)=>{
        const userName = event.target.value;
        if(userName.length == 1)
        api.test(userName).then((response)=>{
            this.setState({users: response.data});
        });
        let error = '';
        this.setState({userName: userName, validName: ''});
        this.state.users.forEach((user)=>{
            if(!userName.localeCompare(user)){
                this.setState({validName: nameExisted});
                error = nameExisted; 
            }
        });
        this.disabledButton(userName, undefined, undefined, error);
    }

    handlePasswordChange = (event)=>{
        const password = event.target.value;
        if(password != '')
            this.setState({userPassword: password, validPassword: ''});
        else
            this.setState({userPassword: password, validPassword: requiredPass, disabledButton: true})
        this.disabledButton(undefined, password, undefined);
    }

    handlePhoneChange = (event)=>{
        let numberPhone = event.target.value;
        this.setState({phone: event.target.value});
        this.disabledButton(undefined, undefined, event.target.value);
        console.log(numberPhone.length);
    }

    handleBlur = ()=>{
        if (this.state.phone.length < 17)
            this.setState({validPhone: shortPhone});
        else
            this.setState({validPhone: ''});
    }

    disabledButton = (name = this.state.userName, password = this.state.userPassword, phone = this.state.phone, validity = this.state.validName )=>{
        const validPassword = this.state.validPassword;

        if(name == '' || password == '' || phone.length < 17){
            this.setState({disabledButton: true});
            return;
        }
        else if(validity.length != 0 || validPassword.length != 0){
            this.setState({disabledButton: true});
            return;
        }
        else    
            this.setState({disabledButton: false});
    }

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      }

    render(){
        return(
           <div>
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Name"
                floatingLabelText="User Name"
                onChange = {this.handleUserNameChange}
                value = {this.state.userName}
                errorText={this.state.validName}
                />
                <br />
                <TextField hintText="Password"
                 floatingLabelText="Password"
                 type="password"
                 onChange={this.handlePasswordChange}
                 value = {this.state.userPassword}
                 errorText={this.state.validPassword}/>
                <br />
                <TextField
                 floatingLabelText="Phone"
                 type="text"
                 value = {this.state.phone}
                 errorText={this.state.validPhone}>
                    <InputMask mask="+375 99 999 99 99" value = {this.state.phone} maskChar="" onChange={this.handlePhoneChange} onBlur={this.handleBlur}/>
                 </TextField>
                <br />
                <RaisedButton label="Add User" disabled={this.state.disabledButton} onClick={this.handleSubmit}/>
            </div>
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
            />
           </div>
        )
    }
}