import React from 'react'
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {notify} from 'react-notify-toast'
import { connect } from 'react-redux'

import BookItem from '../BookItem'
import * as api from '../../services/API'

class CurrentUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      allBooks: [],
      selectedBooks: []
    }
  }

  componentDidMount() {
    const id = this.props.currentUserId;

    // Load user info
    api.fetchUser(id).then((response) => {
      this.setState({user: response.data});
    });

    // Load all book for combo box
    api.fetchBooks().then((response) => {
      this.setState({allBooks: response.data});
    });
  }

  handleSelectBook = (event, index, value) => {
    this.setState({selectedBooks: value});
  }

  handleAddClick = () => {
    const { selectedBooks, user } = this.state
    if (!Array.isArray(selectedBooks) || selectedBooks.length < 1) {
      return
    }

    api.addBooksToUser({ userId: user.id, ids: selectedBooks })
      .then((response) => {
        this.setState({user: response.data})
        if(selectedBooks.length > 1){
          notify.show('Books add', 'success', 2000)
        }else{
          notify.show('Book add', 'success', 2000)
        }
      }).catch((error)=>{
        notify.show(error, 'error', 2000)
      })

    this.setState({ selectedBooks: [] })
  }

  handleDeleteBook = (userId, bookId) => {
    const { user } = this.state
    api.removeBookFromUser(userId, bookId)
      .then((response) => {
        user.books = user.books.filter(book => book.id != bookId);
        this.setState({user})
        notify.show('Book removed', 'success', 2000)
      }).catch((error)=>{
        notify.show("error", 'error', 2000)
      })
  }

  deleteUser = (id) =>{
    api.DeleteUser(id)
    .then((response)=>{
      notify.show('User delete', 'success', 2000)
      setTimeout(()=>{this.props.history.push(`/users`)}, 1000)
    })
    .catch((error)=>{
      notify.show(error, 'error', 2000)
    })
  }

  render() {
    const { allBooks, user, selectedBooks } = this.state;

    if (!user) {
      return (<div>User not found</div>)
    }

    return (
      <Card>
        <CardHeader
        title={`User name ${this.state.user.name}`}
        >
        <RaisedButton label="Delete user" onClick = {()=>{this.deleteUser(user.id)}}/>
        </CardHeader>
        <CardTitle title="Readed Books"/>
        <CardText>
        {
            Array.isArray(user.books) &&
            user.books.map((book, index) => 
              <BookItem 
                  key={index}
                  book={book}
                  edit={true}
                  deleteBook={() => {this.handleDeleteBook(user.id, book.id)}}
              />
            )
        }
        </CardText>
        <CardActions>
        <SelectField
            floatingLabelText="Books to add"
            value={this.state.selectedBooks}
            onChange={this.handleSelectBook}
            multiple={true}
        >
          {
            Array.isArray(allBooks) &&
            allBooks
                .filter(book => !user.books.map(userBook => userBook.id).includes(book.id))
                .map((book, index) =>
                  <MenuItem 
                      key={index} 
                      value={book.id} 
                      primaryText={book.name}
                  />
                )
          }
        </SelectField>
        <RaisedButton label="Add books" onClick={this.handleAddClick}/>

        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
	return{
		currentUserId: state.userReducer.currentUser
	}
}


export default connect(mapStateToProps)(CurrentUser)