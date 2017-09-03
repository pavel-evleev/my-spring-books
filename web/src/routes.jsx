import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import About from './components/About'
import Books from './components/Books'
import Home from './components/Home'

/**
 * Hash url router.
 * Connect components with browser url links.
 */
export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/books">Books</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/books" component={Books}/>
        </div>
      </Router>
    )
  }
}