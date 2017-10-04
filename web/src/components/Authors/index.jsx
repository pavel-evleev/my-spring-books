import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
// import AuthorItem from '../AuthorItem'
import * as api from '../../services/API'
import {List, ListItem} from 'material-ui/List'


export default class Authors extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            authors:[],
            authorLoading: false,
            error: null
        }
    }


    componentDidMount(){
        this.setState({authors: [], authorLoading: true, error: null})
        api.fetchAuthors()
            .then((response) =>{
                this.setState({authors: response.data, authorLoading: false})
            })
            .catch((error)=>{
                this.setState({authors: [], authorLoading: false, error: error.toString()})
            })
    }

    deleteAuthor = (id) =>{
        api.DeleteAuthor(id)
        .then((response)=>{
            if(response.status<299){
            let tmp = this.state.authors;
            let v=0;
            tmp.forEach((author,index)=>{
                    if(author.id == id)
                    v = index;
                });
                tmp.splice(v,1);
                this.setState({authors: tmp});
            }
        });
    }

    render(){
        if(this.state.authorLoading){
            return(<CircularProgress />)
        }

        if(this.state.error){
            return(<div>{this.state.error}</div>)
        }
        return(
            <div style={{ margin: "0 25%" }}>
            <h2>Authors</h2>
            <List>
                {this.state.authors.map(
                    (author, index)=>
                        <ListItem key={index} primaryText={author.name}
                         rightIconButton={
                             <IconButton onClick = {()=>{this.deleteAuthor(author.id)}} tooltip="Delite">
                                <ActionDelete />
                            </IconButton>
                        }/>
                )}
            </List>
          </div>
        )
    }
}