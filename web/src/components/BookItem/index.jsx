import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

/**
 * Simple book list item.
 */
export default class BookItem extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <p>
        <Card>
          <CardHeader
            title={book.name}
            subtitle={book.authors.join(', ')}
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardActions>
              <IconButton onClick={() => { alert('123') }}>
                <ActionDelete />
              </IconButton>
            </CardActions>
            <CardText expandable={true}>
              Blasdasadsd
            </CardText>
        </Card>
      </p>
    )
  }
}