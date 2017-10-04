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
            name: '',
            hidden: "",
            result: "not add",
            displayResult: "none",
            styleResult: "succes"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);

    }

    handleChange = (event) =>{
        this.setState({name: event.target.value});
    }

    handleAddClick = () =>{
        console.log(this.state.name);
      api.CreateAuthor({name: this.state.name})
      .then((response) =>{
          if(response.status==201)
          this.setState({hidden: "none",
          displayResult: "block",
          result: "succes!"
        });
        else{
            this.setState({hidden: "none",
            displayResult: "block"
          });
        }
        setTimeout(()=>{
            this.setState({hidden: "block", displayResult: "none", name: ""});
            },1000);
        setTimeout(()=>{
            this.props.history.push("/authors")
            },1001);
      })
      .catch((error)=>{
          this.setState({result: "not add becouse: "+error, styleResult: "bad"});
      });
    };
  

   render(){
       return(
           <form>
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Hint Text"
                floatingLabelText="Author Name"
                onChange = {this.handleChange}
                value = {this.state.name}
                />
                <br />
                <RaisedButton label="Default" style={style} onClick={this.handleAddClick} />
                    
            </div>
            <div style={{margin: "0 25%", display: this.state.displayResult}}>
                <span className={this.state.styleResult}>{this.state.result}</span>
            </div>
           </form>
        )
    }  
}
/*TODO 
добавить отображение юзеров
добавление юзеров
добавление книги
с выподающим списком всех возможных авторов
если нету в списке, то добавить.
*/