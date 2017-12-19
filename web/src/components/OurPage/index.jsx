import React from 'react'
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/svg-icons/action/list'
import Grid from 'material-ui/svg-icons/action/view-module'
import Paper from 'material-ui/Paper'
import Books from './../Books'

export default class Page extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: "grid"
    }
  }

  componentDidMount() {

  }

  render() {
    let button = null
    if (this.state.view === "grid") {
      button = <Grid />
    } else {
      button = <List />
    }

    return (
      <div className="page">
        <Paper className="view-books">
          <IconButton touch={true}
            onClick={() => { (this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" })) }}>
            {button}
          </IconButton>
        </Paper>
        <Paper className="user">
          <div className="user-ava">
            <div>
              <img src={require("./../../img/photo40427709_329412123.jpg")} alt="user" />
            </div>
          </div>
          <div className="user-info">info</div>
        </Paper>
        <div className="user-books">
          <Books view={this.state.view} />
        </div>
      </div>
    )
  }
}
