import React from 'react'

import AuthorItem from '../AuthorItem'
import * as api from '../../services/API'


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

    render(){
        if(this.state.authorLoading){
            return(<div>Loading...</div>)
        }

        if(this.state.error){
            return(<div>{this.state.error}</div>)
        }
        return(
            <div style={{ margin: "0 25%" }}>
            <h2>Authors</h2>
            {this.state.authors.map(
              (author, index) => 
                <div key={index}>
                  <AuthorItem author={author}/>
                  <hr/>
                </div>
              )
            }
          </div>
        )
    }
}