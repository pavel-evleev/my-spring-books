import React from 'react'

import * as api from '../../services/API'
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card'
import BookItem from '../BookItem'



export default class User extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            user: '',
            books: ''
        }
    }


    componentDidMount(){
       const id = this.props.match.params.id;
       
        this.setState({ user: []})
        api.fetchUser(id).then((response)=>{
            this.setState({user: response.data});
        })
        this.setState({books: this.state.user.books})
    }

    deleteBook = (userId, bookId) =>{
        api.removeBookFromUser(userId, bookId)
        .then((response)=>{
            if(response.status<299){
            let tmp = this.state.books;
            let v=0;
            tmp.forEach((book,index)=>{
                    if(book.id == id)
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
                           return(<BookItem key={index} book={book} deleteBook={()=>this.deleteBook(this.state.user.id, book.id)} />)
                        })
                        
                    }
                </CardText>
          </Card>
     )
   }
 }