import React from 'react'

/**
 * Simple book list item.
 */
export default class BookItem extends React.Component {
  render() {
    return (
      <div>
        Name: {this.props.book.name}
        <br/>
        Authors: 
        <ol>
          {this.props.book.authors.map(
          (author, index) => 
            <li key={index}>{author} </li>
          )
        }
        </ol>
      </div>
    )
  }
}