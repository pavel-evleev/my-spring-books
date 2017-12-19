import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UsersAction from './../../services/ducks/action'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

	/*
	 * Load all books when component is created.
	 */
  componentDidMount() {
    this.props.loadingUsers()
  }

  render() {
    // Show loading bar if HTTP request is not completed
    if (this.props.fetching) {
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
  return {
    fetching: state.fetching,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadingUsers: UsersAction.loadingUsers }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Users)
