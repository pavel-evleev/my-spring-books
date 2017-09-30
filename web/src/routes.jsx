import React from 'react'
import {Route} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import DrawerOpenRightExample from './components/Home/DrawerOpenRightExample'

import About from './components/About'
import Books from './components/Books'
import Home from './components/Home'
import Authors from './components/Authors'
import AddAuthor from './components/AddAuthor'

/**
 * Hash url router.
 * Connect components with browser url links.
 */
export default class Routes extends React.Component {
 
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleTouchTap = () => {
    this.setState({ open: !this.state.open})
  }

 
  render() {
    return (
      <div>
        <AppBar
          title="Title"
          onLeftIconButtonTouchTap={this.handleTouchTap}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <DrawerOpenRightExample
          onClose={this.handleTouchTap}
          open={this.state.open}
        />
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/books" component={Books}/>
            <Route path="/authors" component={Authors} />
            <Route path="/add-author" component={AddAuthor} />
          </div>
      </div>
    )
  }
}