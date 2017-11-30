import React from 'react'
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {notify} from 'react-notify-toast'

import BookItem from '../BookItem'
import * as api from '../../services/API'

export default class User extends React.Component {

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


	render() {
		const { allBooks, user } = this.state;

		if (!user) {
			return (<div>User not found</div>)
		}

		return (
			<Card>
				<CardHeader
				title={`User name ${this.state.user.name}`}
				>
				</CardHeader>
				<CardTitle title="Readed Books"/>
				<CardText>
				{
						Array.isArray(user.books) &&
						user.books.map((book, index) => 
							<BookItem 
									key={index}
									book={book}
									edit={false}
							/>
						)
				}
				</CardText>
			</Card>
		)
	}
}