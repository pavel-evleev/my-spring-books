import React from 'react'
import Paper from 'material-ui/Paper'
import Books from './../Books'

export default class Page extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render() {
    return (
      <div className="page">
        <Paper className="user">
          <div className="user-ava">
            <div>
              <img src={require("./../../img/photo40427709_329412123.jpg")} alt="user" />
            </div>
          </div>
          <div className="user-info">info</div>
        </Paper>
        <div className="user-books">
          <Books />
        </div>
      </div>
    )
  }
}
