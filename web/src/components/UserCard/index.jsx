import React from 'react'
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {notify} from 'react-notify-toast'

import BookItem from '../BookItem'
import * as api from '../../services/API'
import UserCardAction from '../UserCardAction'

export default class UserCard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			user: null,
			allBooks: [],
		}
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		// Load user info
		api.fetchUser(id).then((response) => {
			this.setState({user: response.data});
		});

		// Load all book for combo box
		api.fetchBooks().then((response) => {
			this.setState({allBooks: response.data});
		});
	}

	deleteUser = (id) =>{
    api.DeleteUser(id)
    .then((response)=>{
      notify.show('User delete', 'success', 2000)
      setTimeout(()=>{this.props.history.push(`/users`)}, 1000)
    })
    .catch((error)=>{
      notify.show('error', 'error', 2000)
    })
  }

	buttonDeleteUser = ()=>{
		if(this.props.enable){
			return(
				<RaisedButton 
					label="Delete user"
					onClick = {()=>{this.deleteUser(user.id)}}
				/>
			)}
	}

	userCardAction = ()=>{
		if(this.props.enable){
			return(
				<UserCardAction 
					handleAddClick={}
					handle
				/>
			)}
	}

	render() {
		const { allBooks, user } = this.state
		const { enable, deleteBook } = this.props

		if (!user) {
			return (<div>User not found</div>)
		}

		return (
			<Card>
				<CardHeader
				title={`User name ${this.state.user.name}`}
				>
				{
					this.buttonDeleteUser()
				}
				</CardHeader>
				<CardTitle title="Readed Books"/>
				<CardText>
				{
						Array.isArray(user.books) &&
						user.books.map((book, index) => 
							<BookItem 
									key={index}
									book={book}
									edit={enable}
									deleteBook={deleteBook(user.id, book.id)}
							/>
						)
				}
				</CardText>
				{
					this.userCardAction()
				}
			</Card>
		)
	}
}