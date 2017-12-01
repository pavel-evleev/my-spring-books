import React from 'react'
import { CardActions, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {notify} from 'react-notify-toast'
import { connect } from 'react-redux'

import BookItem from '../BookItem'
import * as api from '../../services/API'

export default class UserCardAction extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      allBooks: [],
      selectedBooks: []
    }
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
        notify.show('error', 'error', 2000)
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

 

  render() {
    const { allBooks, user, selectedBooks } = this.state;

    if (!user) {
      return (<div>User not found</div>)
    }

    return (
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
    )
  }
}
