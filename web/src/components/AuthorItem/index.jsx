import React from 'react'


export default class AuthorItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span>
        Name: {this.props.author.name}
        Written books:
                <ol>
          {this.props.author.books.map(
            (book, index) =>
              <li key={index}>{book.name}</li>
          )}
        </ol>
      </span>

    )
  }
}