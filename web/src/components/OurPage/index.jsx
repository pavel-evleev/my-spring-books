import React from 'react'
import IconButton from 'material-ui/IconButton'
import Mail from 'material-ui/svg-icons/communication/email'
import Paper from 'material-ui/Paper'
import Books from './../Books'
import ToolBar from './../ToolBar'

const user = {
  name: "Pasha",
  books: [{ id: 1, name: "test" }, { id: 2, name: "test" }, { id: 3, name: "test" }, { id: 4, name: "test" }]
}


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
    const { name, books } = user
    return (
      <div className="page">
        <ToolBar changeViewOnClick={()=>{(this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" }))}} className="view-books" />
        <Paper className="user">
          <div className="user-ava">
            <div>
              <img src={require("./../../img/photo40427709_329412123.jpg")} alt="user" />
            </div>
          </div>
          <div>
            <div className="user-info">{name}</div>
            <IconButton touch={true}
              onClick={() => { alert("click") }}>
              <Mail />
            </IconButton>
          </div>
          <div>counting books:{books.length}</div>
        </Paper>
        <div className="user-books">
          <Books view={this.state.view} />
        </div>
      </div>
    )
  }
}
