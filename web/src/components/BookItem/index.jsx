import React from 'react'

/**
 * Simple book list item.
 */
export default class BookItem extends React.Component {
  render() {
    return (
      <div>
        Name: {this.props.book.id}
        <br/>
        Authors: {this.props.book.authors.map(
          (author, index) => 
            <span key={index}>{author.name}</span>
          )
        }
      </div>
    )
  }
}