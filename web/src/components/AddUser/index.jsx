import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as api from '../../services/API'
import Snackbar from 'material-ui/Snackbar'

const requiredPass = "This field is required";

export default class AddUser extends React.Component{

    constructor(props){
        super(props)
        this.state={
            users: [],
            userName: '',
            userPassword: '',
            phone: '',
            message: '',
            errorValidation: '',
            validPassword: requiredPass,
            disabledButton: false,
            open: false
        }

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        api.fetchUsers().then((response)=>{
            this.setState({users: response.data})
        })
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
                    this.props.history.push("/users")
                    },1001);
            }).catch((error)=>{
                this.setState({message: "not add because: "+error});
            });
    }

    handleUserNameChange = (event)=>{
        const userName = event.target.value;
        this.setState({userName: userName, errorValidation: '', disabledButton: false});
        this.state.users.forEach((user)=>{
            if(userName.localeCompare(user.name)==0){
                this.setState({errorValidation:"This name already existed", disabledButton: true});
                return;
            }
        })

        
    }
    handlePasswordChange = (event)=>{
        if(event.target.value!='')
            {
                this.setState({userPassword: event.target.value, validPassword: ''});
                if(this.state.errorValidation =='')
                    this.setState({disabledButton: false})
            }
        else
            this.setState({userPassword: event.target.value, validPassword: requiredPass, disabledButton: true})

    }
    handlePhoneChange = (event)=>{
        this.setState({phone: (event.target.validity.valid)? event.target.value : this.state.phone})
    }

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
    render(){
        return(
           <div>
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Name"
                floatingLabelText="User Name"
                onChange = {this.handleUserNameChange}
                value = {this.state.userName}
                errorText={this.state.errorValidation}
                />
                <br />
                <TextField hintText="Password"
                 floatingLabelText="Password"
                 type="password"
                 onChange={this.handlePasswordChange}
                 value = {this.state.userPassword}
                 errorText={this.state.validPassword}/>
                <br />
                <TextField hintText="375 (XX) XXX XX"
                 floatingLabelText="Phone"
                 type="text"
                 pattern="[0-9]*"
                 onChange={this.handlePhoneChange}
                 value = {this.state.phone}/>
                <br />
                <RaisedButton label="Add User" disabled={this.state.disabledButton} onClick={this.handleSubmit} />
                    
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