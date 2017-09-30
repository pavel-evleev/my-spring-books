import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as api from '../../services/API'
const style = {
    margin: "0 25%",
  };

 
export default class AddAuthor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);

    }

    handleChange = (event) =>{
        this.setState({name: event.target.value});
    }

    handleAddClick = () =>{
        console.log(this.state.name);
      api.fetchAddAuthor({name: this.state.name})
      .then((response) =>{
          if(response.status==201)
          return(<div>sucess</div>);
      });
    };
  

   render(){
       return(
           <form>
           <div style={{margin: "0 25%"}}>
                <TextField id="name"
                hintText="Hint Text"
                floatingLabelText="Author Name"
                onChange={this.handleChange}
                /><br />
                <RaisedButton label="Default" style={style} onClick={this.handleAddClick} />
            </div>
           </form>
            
        )
    }  
}