import React from 'react'

import * as api from '../../services/API'

import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

/*
 * View for listing books.
 */
export default class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usersLoading: false,
      error: null
    }
    this.deleteUser = this.deleteUser.bind(this);
  }

  /*
   * Load all books when component is created.
   */
  componentDidMount() {
    this.setState({ users: [], usersLoading: true, error: null })
    api.fetchUsers()
      .then((response) => {
        this.setState({ users: response.data, usersLoading: false })
      })
      .catch((error) => {
        this.setState({ users: [], usersLoading: false, error: error.toString() })            
      })
  }


  deleteUser = (id) =>{
    api.DeleteUser(id)
    .then((response)=>{
        if(response.status<299){
        let tmp = this.state.users;
        let v=0;
        tmp.forEach((user, index)=>{
                if(user.id == id)
                v = index;
            });
            tmp.splice(v,1);
            this.setState({users: tmp});
        }
    });
}

  render() {
    // Show loading bar if HTTP request is not completed
    if (this.state.usersLoading) {
      return (<div>Loading...</div>)
    }

    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }

    return (
      <div style={{ margin: "0 25%" }}>
        <h2>Users</h2>
        <List>
        {this.state.users.map(
          (user, index) => 
              <ListItem key={index} primaryText={user.name}
              rightIconButton={
                <IconButton onClick = {()=>{this.deleteUser(user.id)}} tooltip="Delite">
                    <ActionDelete />
                </IconButton>
                }/>
          )
        }
    </List>
      </div>
    )
  }
}