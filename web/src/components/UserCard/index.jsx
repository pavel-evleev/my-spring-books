import React from 'react'
import { Card, CardTitle, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import { notify } from 'react-notify-toast'

import BookItem from '../BookItem'
import * as api from '../../services/API'
import UserCardAction from '../UserCardAction'

export default class UserCard extends React.Component {

  constructor(props) {
    super(props)
  }

  buttonDeleteUser = () => {
    if (this.props.enable) {
      return (
        <RaisedButton
          label="Delete user"
          onClick={() => { this.props.deleteUser(this.props.user.id) }}
        />
      )
    }
  }

  userCardAction = () => {
    if (this.props.enable) {
      return (
        <UserCardAction
          handleAddClick={this.props.handleAddClick}
          allBooks={this.props.allBooks}
          user={this.props.user}
        />
      )
    }
  }

  render() {
    const { allBooks, user, enable, deleteBook } = this.props

    return (
      <Card>
        <CardHeader
          title={`User name ${user.name}`}
        >
          {
            this.buttonDeleteUser()
          }
        </CardHeader>
        <CardTitle title="Readed Books" />
        <CardText>
          {
            Array.isArray(user.books) &&
            user.books.map((book, index) =>
              <BookItem
                key={index}
                book={book}
                edit={enable}
                deleteBook={() => { deleteBook(user.id, book.id) }}
              />
            )
          }
        </CardText>
        {
          this.userCardAction()
        }
      </Card>
    )
  }
}