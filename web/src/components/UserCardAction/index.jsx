import React from 'react'
import { CardActions, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'

import * as api from '../../services/API'

export default class UserCardAction extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allBooks: null,
      selectedBooks: []
    }
  }

  handleSelectBook = (event, index, value) => {
    this.setState({ selectedBooks: value });
  }

  handleAddClick = () => {
    this.props.handleAddClick(this.state.selectedBooks)
    this.setState({ selectedBooks: [] })
  }

  render() {
    const { allBooks, user } = this.props;

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
        <RaisedButton label="Add books" onClick={this.handleAddClick} />
      </CardActions>
    )
  }
}
