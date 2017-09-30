import React from 'react'


export default class AuthorItem extends React.Component{

    render(){
        return(
            <div>
                Name: {this.props.author.name}
                <br/>
                Written books:
                <ol>
                {this.props.author.books.map(
                    (book, index) => 
                    <li key={index}>{book.name}</li>
                )}
                </ol>
            </div>

        )
    }
}