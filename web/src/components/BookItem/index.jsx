import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'


/**
 * Simple book list item.
 */
export default class BookItem extends React.Component {

  handleDeleteBook = () => {
    this.props.deleteBook();
  }

  groupAuthors = (authors) => {
    if (Array.isArray(authors)) {
      return authors.join(', ')
    }
    return authors
  }

  handleEdit = (edit) => {
    if (edit) {
      return (
        <CardActions>
          <IconButton onClick={this.handleDeleteBook}>
            <ActionDelete />
          </IconButton>
        </CardActions>
      )
    }
  }

  render() {
    const book = this.props.book;
    return (
      <div>
        <Card>
          <CardHeader
            title={book.name}
            subtitle={this.groupAuthors(book.authors)}
            actAsExpander={true}
            showExpandableButton={true}
          />
          {this.handleEdit(this.props.edit)}
          <CardText expandable={true}>
            Description
            </CardText>
        </Card>
      </div>
    )
  }
}