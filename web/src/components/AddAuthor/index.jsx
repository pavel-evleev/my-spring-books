import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import * as api from '../../services/API'

const style = {
    margin: "0 25%",
  };

 
export default class AddAuthor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authors:[],
            name: '',
            hidden: "",
            open: false,
            message:'',
            errorValidation: '',
            buttonDisable: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);

    }

    componentDidMount(){
        api.fetchAuthors().then((response)=>{
            this.setState({authors: response.data})
        });

    }

    handleChange = (event) =>{
        const authorName = event.target.value;
        this.setState({name: authorName, buttonDisable: false, errorValidation:''});
        this.state.authors.forEach((author)=>{
            if(author.name.localeCompare(authorName)==0){
                this.setState({errorValidation: "This name already existed", buttonDisable: true});
                return;
            }
        })
        
    }

    handleAddClick = () =>{
        // console.log(this.state.name);
      api.CreateAuthor({name: this.state.name})
      .then((response) =>{
          if(response.status==201)
          this.setState({hidden: "none",
          open: true,
          message: "succes!"
        });
        else{
            this.setState({hidden: "none"});
        }
        setTimeout(()=>{
            this.setState({hidden: "block", name: ""});
            },1000);
        setTimeout(()=>{
            this.props.history.push("/authors")
            },1001);
      })
      .catch((error)=>{
          this.setState({message: "not add because: "+error, open: true});
      });
    };
  
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
                floatingLabelText="Author Name"
                onChange = {this.handleChange}
                value = {this.state.name}
                errorText={this.state.errorValidation}
                />
                <br />
                <RaisedButton label="Add Author" disabled={this.state.buttonDisable} style={style} onClick={this.handleAddClick} />
                    
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
