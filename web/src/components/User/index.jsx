import React from 'react'

import * as api from '../../services/API'
import {Card, CardTitle,CardActions, CardHeader, CardText} from 'material-ui/Card'
import BookItem from '../BookItem'



export default class User extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            user: ''
        }
    }


    componentDidMount(){
       const id = this.props.match.params.id;
       
        this.setState({ user: [], books: []})
        api.fetchUser(id).then((response)=>{
            this.setState({user: response.data});
        })
    }

    deleteBook = (userId, bookId) =>{
        api.removeBookFromUser(userId, bookId)
        .then((response)=>{
            if(response.status<299){
                let tmp = this.state.user.books;
                let v=0;
                tmp.forEach((book, index)=>{
                        if(book.id == bookId)
                        v = index;
                    });
                    tmp.splice(v,1);
                    this.setState({books: tmp});
            }
        });
        
            
    }

    render() {
        
        return (
            <Card>
                <CardHeader
                    title={`User name ${this.state.user.name}`}
                />
                <CardTitle title="Readed Books"/>
                <CardText>
                    {
                        Array.isArray(this.state.user.books) &&
                        this.state.user.books.map((book, index)=>{
                           return(<BookItem key={index} book={book} deleteBook={()=>{
                               this.deleteBook(this.state.user.id, book.id)}} />)
                        })
                        
                    }
                </CardText>
                <CardActions>
                {/* <SelectField
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
                </SelectField> */}
                </CardActions>
          </Card>
     )
   }
 }