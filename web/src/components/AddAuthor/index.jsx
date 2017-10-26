import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import * as api from '../../services/API'
import {notify} from 'react-notify-toast'

const style = {
    margin: "0 25%",
  };

 
export default class AddAuthor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authors:[],
            name: '',
            validName: '',
            buttonDisable: false
        };
    }

    componentDidMount(){
        api.fetchAuthors().then((response)=>{
            this.setState({authors: response.data})
        }).catch((error)=>{
            notify.show(error,"error");
        });
    }

    handleChange = (event) =>{
        const authorName = event.target.value;
        this.setState({name: authorName, buttonDisable: false, validName:''});
        this.state.authors.forEach((author)=>{
            if(author.name.localeCompare(authorName) == 0){
                this.setState({validName: "This name already existed", buttonDisable: true});
            }
        })
    }

    handleAddClick = () =>{
      api.CreateAuthor({name: this.state.name})
      .then((response) =>{
                notify.show('Author success add','success', 3000);
                setTimeout(()=>{
                    this.setState({name: ""});
                    },1000);
        })
        .catch((error)=>{
            notify.show(error,'error');
        });
    };

   render(){
       return(
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Name"
                floatingLabelText="Author Name"
                onChange = {this.handleChange}
                value = {this.state.name}
                errorText={this.state.validName}
                />
                <br />
                <RaisedButton label="Add Author" disabled={this.state.buttonDisable} style={style} onClick={this.handleAddClick} />
            </div>
        )
    }  
}
