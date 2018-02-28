import React from 'react'
import CircularProgress from './../MagicProgress'
import Avatar from 'material-ui/Avatar'
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
    if (this.props.error) {
      return (<div>{this.props.error}</div>)
    }

    return (
      <div>
        <h2>Users</h2>
        <List>
          {this.props.users.map(
            (user, index) =>
              <ListItem style={{ backgroundColor: "white", margin: "5px 0", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 6px -3px 20px, rgba(0, 0, 0, 0.23) 0px 3px 10px" }} key={index} primaryText={user.name}
                onClick={() => this.props.history.push(`/users/${user.id}`)}
                leftAvatar={<Avatar src={user.avatar ? user.avatar :
                  require("../../img/photo40427709_329412123.jpg")
                  // "https://myspringbooks.herokuapp.com/v1/img/user.png"
                } />}
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
    users: state.users,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadingUsers: UsersAction.loadingUsers }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Users)
