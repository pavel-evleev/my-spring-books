import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import * as api from '../../services/API'

export default class AddBook extends React.Component{

    constructor(props){
        super(props)
        this.state={
            hidden: '',
            name: '',
            displayResult: '',
            result: '',
            styleResult: '',
            authors: [],
            arraySelectedAuthors: [],
            selectedAuthors: null,
            publishedDate: null,
            value:'',
            error: null
        };
    }

    componentDidMount(){
        this.setState({authors: [], error: null});
        api.fetchAuthors().then((response)=>{
            this.setState({authors: response.data});
            console.log(this.state.authors);
        })
        .catch((error) => {
            this.setState({ authors: [], error: error.toString() })            
        });
    }

    handleDateChange = (objNull, date) => {
        this.setState({publishedDate: date});
    }

    handleNameChange = (event)=>{
        this.setState({name: event.target.value});
    }

    handleSelectedChange = (event, index, value)=>{
        debugger;
        let arr = this.state.arraySelectedAuthors;
        let i = value;
        if(arr.length == 0)
        {
            arr.push(i);
            this.setState({arraySelectedAuthors: arr});
        }
        else{
            if(-1==arr.indexOf(i)){
                arr.push(i);
                this.setState({arraySelectedAuthors: arr});
            }
        }
        this.setState({value});
        console.log(this.state.arraySelectedAuthors);   
    }

    render(){
        return(
           <form>
            <div style={{margin: "0 25%", display: this.state.hidden }}>
                <TextField id="name"
                hintText="Hint Text"
                floatingLabelText="Book Name"
                onChange = {this.handleNameChange}
                value = {this.state.name}
                />
                <br />

                <div>Add Authors....</div>
                <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.value}
                    onChange={this.handleSelectedChange}
                    >
                    {
                        this.state.authors.map(
                            (author, index)=>
                                <MenuItem key={index} value={author.id} primaryText={author.name}/>
                            )
                    }
                </SelectField>
                <br/>
                <DatePicker hintText="Published Date" floatingLabelText="Published Date" onChange={this.handleDateChange} />
                <RaisedButton label="Add" onClick={this.handleAddClick} />
                    
            </div>
            <div style={{margin: "0 25%", display: this.state.displayResult}}>
                <span className={this.state.styleResult}>{this.state.result}</span>
            </div>
           </form>
        )
    }
}