import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'

import * as api from '../../services/API'

export default class AddBook extends React.Component{

    constructor(props){
        super(props);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear());

        this.state={
            maxDate: maxDate,
            hidden: '',
            name: '',
            authors: [],
            arraySelectedAuthors: [],
            selectedAuthors: null,
            publisher:'',
            publishedDate: null,
            value:'',
            open: false,
            message:'',
            error: null,
            newAuthors : ''
        };
    }

    componentDidMount(){
        this.setState({authors: [], error: null});
        this.getAuthors();
    }

    getAuthors = ()=>{
        api.fetchAuthors().then((response)=>{
            this.setState({authors: response.data});
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

    handlenewAuthorsChange = (event)=>{
        this.setState({newAuthors: event.target.value});
    }

    handlePublisherChange = (event)=>{
        this.setState({publisher: event.target.value});
    }

    handleSelectedChange = (event, index, value)=>{
        this.setState({arraySelectedAuthors: value});
        this.setState({value});
    }

    handleAddClick = ()=>{
        api.CreateBook(
            {
                name: this.state.name, 
                publisher: this.state.publisher,
                datePublished: this.state.publishedDate,
                authorsIds: this.state.arraySelectedAuthors,
                newAuthors: this.state.newAuthors ? this.state.newAuthors.split('\n') : []
            }).then((response)=>{
                if(response.status == 201){
                    this.setState(
                        {
                            hidden: "none",
                            open: true,
                            message: "succes!"
                        }
                    );
                    setTimeout(()=>{
                        this.props.history.push("/books")
                        },1001);
                }
            }).catch((error)=>{
                this.setState({message: "not add because: "+error, open: true});
            });
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
                <TextField 
                hintText="Book Name"
                floatingLabelText="Book Name"
                onChange = {this.handleNameChange}
                value = {this.state.name}
                />
                <br />
                <TextField
                hintText="Publisher"
                floatingLabelText="Publisher"
                onChange = {this.handlePublisherChange}
                value = {this.state.publisher}
                />
                <br />

                <div>Add Authors....</div>
                <SelectField
                    floatingLabelText="Authors"
                    value={this.state.value}
                    onChange={this.handleSelectedChange}
                    multiple={true}
                    >
                    {
                        this.state.authors.map(
                            (author, index)=>
                                <MenuItem key={index} value={author.id} primaryText={author.name}/>
                            )
                    }
                </SelectField>
                <br/>
                <TextField
                    multiLine={true}
                    hintText="New author"
                    floatingLabelText="New Author"
                    onChange = {this.handlenewAuthorsChange}
                    value = {this.state.newAuthors}
                />
                <br />
                <DatePicker hintText="Published Date"
                            floatingLabelText="Published Date"
                            autoOk={true}
                            maxDate={this.state.maxDate}
                            value={this.state.publishedDate}
                            onChange={this.handleDateChange} />
                <RaisedButton label="Add" onClick={this.handleAddClick} />
                    
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