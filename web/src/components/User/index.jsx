import React from 'react'
import BookItem from '../BookItem'
import * as api from '../../services/API'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardTitle,CardActions, CardHeader, CardText} from 'material-ui/Card'



export default class User extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            user: '',
            allBooks: [],
            arraySelectedAuthors: '',
            value: ''
        }
    }


    componentDidMount(){
       const id = this.props.match.params.id;
       
        this.setState({ user: [], allBooks: []});
        api.fetchUser(id).then((response)=>{
            this.setState({user: response.data});
        });
        
        api.fetchBooks().then((response)=>{
            // debugger;
          this.setState({allBooks: this.deleteExistedBooks(response.data)});
        });
    }

    handleSelectedChange = (event, index, value)=>{
        this.setState({arraySelectedAuthors: value});
        this.setState({value});
    }

    deleteExistedBooks = (books)=>{
        let booksMap = new Map();
        books.forEach((book)=>{
            booksMap.set(book.id, book);
        });
        this.state.user.books.forEach(
            (book)=>{
                if(booksMap.has(book.id)){
                    booksMap.delete(book.id);
                }
            });
        let arBooks = [];
        booksMap.forEach((value, key, map)=>{
                arBooks.push(value);
        });
        return arBooks;
    } 

    handleAddClick = ()=>{

        if(this.state.arraySelectedAuthors!=null && this.state.arraySelectedAuthors!=undefined){
            api.addBooksToUser({userId: this.state.user.id, ids: this.state.arraySelectedAuthors})
            .then((response)=>{
                this.setState({user: response.data});
                // debugger;
                this.setState({allBooks: this.deleteExistedBooks(this.state.allBooks), arraySelectedAuthors: ''});
            })
        }

    } 

    deleteBook = (userId, bookId) =>{
        // debugger;
        let removedBook='';
        api.removeBookFromUser(userId, bookId)
        .then((response)=>{
            if(response.status<299){
                let user = this.state.user;
                let tmp = user.books;
                let v=0;
                tmp.forEach((book, index)=>{
                        if(book.id == bookId)
                        v = index;
                    });
                    removedBook = tmp.splice(v,1);
                    this.setState({user});
            }
        });
        //получаем список всех книг заново, вдруг изменилось
        api.fetchBooks().then((response)=>{
            // debugger;
            let returnedBooks = this.deleteExistedBooks(response.data)
          this.setState({allBooks: returnedBooks});
        });
    }

    render() {
        
        return (
            <div>
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
                <SelectField
                    floatingLabelText="Books to add"
                    value={this.state.value}
                    onChange={this.handleSelectedChange}
                    multiple={true}
                    >
                    {
                        //почему в этот блок мы спускаемся 3 раза, и только на 4 видим что это массив?
                        Array.isArray(this.state.allBooks)&&
                        this.state.allBooks.map(
                            (book, index)=>
                            <MenuItem key={index} value={book.id} primaryText={book.name}/>
                            )
                    }
                </SelectField>
                <RaisedButton label="Add books" onClick={this.handleAddClick} />
                </CardActions>
          </Card>
        
        </div>
     )
   }
 }