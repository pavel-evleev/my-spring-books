import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { connect } from 'react-redux'



/**
 * Simple book list item.
 */
class BookItem extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const id = parseInt(this.props.match.params.bookId);

    console.log(this.props.match)
  }


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
    const { book, edit } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            title={book.name}
            subtitle={this.groupAuthors(book.authors)}
            actAsExpander={true}
            showExpandableButton={true}
          />
          {this.handleEdit(edit)}
          <CardText expandable={true}>
            Description
          </CardText>
        </Card>
      </div>
    )
  }
}

BookItem.defaultProps = { edit: false }

const mapStateToProps = (state) =>{
  return{
    books: state.booksReducer.books
  }
}

export default connect(mapStateToProps)(BookItem)