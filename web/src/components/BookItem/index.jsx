import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'


/**
 * Simple book list item.
 */
export default class BookItem extends React.Component {
  
  handleDeleteBook = ()=>{
    this.props.deleteBook();
  }
  
  render() {
    const book = this.props.book;
    return (
      <div style={{marginBottom: "10px"}}>
        <Card>
          <CardHeader
            title={book.name}
            subtitle={book.authors.join(', ')}
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardActions>
              <IconButton onClick={this.handleDeleteBook}>
                <ActionDelete />
              </IconButton>
            </CardActions>
            <CardText expandable={true}>
             Description
            </CardText>
        </Card>
      </div>
    )
  }
}