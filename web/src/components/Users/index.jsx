import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UsersAction from './../../ducks/action'

import * as api from '../../services/API'


/*
 * View for listing books.
 */
class Users extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			usersLoading: false,
			error: null
		}
	}

	/*
	 * Load all books when component is created.
	 */
	componentDidMount() {
		this.setState({usersLoading: true, error: null })
		api.fetchUsers()
			.then((response) => {
        this.props.loadingUsers(response.data)
				this.setState({usersLoading: false })
			})
			.catch((error) => {
				this.setState({usersLoading: false, error: error.toString() })
			})
	}

	render() {
		// Show loading bar if HTTP request is not completed
		if (this.state.usersLoading) {
			return (<CircularProgress />)
		}

		// Show error if HTTP request failed
		if (this.state.error) {
			return (<div>{this.state.error}</div>)
		}

		return (
			<div style={{ margin: "0 25%" }}>
				<h2>Users</h2>
				<List>
					{this.props.users.map(
						(user, index) =>
							<ListItem key={index} primaryText={user.name}
								onClick={() => this.props.history.push(`/users/${user.id}`)}
							/>
					)
					}
				</List>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state.userReducer)
	return{
		users: state.userReducer.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		loadingUsers: bindActionCreators(UsersAction.loadingUsers, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
