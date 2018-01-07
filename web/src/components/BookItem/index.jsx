import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { connect } from 'react-redux'



/**
 * Simple book list item.
 */
class BookCard extends React.Component {
 

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
    const { book, edit, expandable, expButton } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            title={book.name}
            subtitle={this.groupAuthors(book.authors)}
            actAsExpander={true}
            showExpandableButton={expButton}
          />
          {this.handleEdit(edit)}
          <CardText expandable={expandable}>
            {book.description}
          </CardText>
        </Card>
      </div>
    )
  }
}

BookCard.defaultProps = { edit: false, expandable: false, expButton: false }

export default BookCard