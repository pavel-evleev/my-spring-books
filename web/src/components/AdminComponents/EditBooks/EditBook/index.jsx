import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../../../services/ducks/action'
import Button from './../../../Button'
import Progress from './../../../MagicProgress'

class EditBook extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nameBook: null,
      nameAuthor: null,
      genreBook: null
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.bookId)
    this.props.adminGetBookById(id)
  }

  handleGenresSelectedChange = (event, index, value) => {
    this.setState({ genreId: value })
  }

  valueByDefaultName = () => {
    if (this.state.nameBook) {
      return this.state.nameBook
    } else return this.props.book.name
  }

  valueByDefaultAuthor = () => {
    if (this.state.nameAuthor) {
      return this.state.nameAuthor
    } else return this.props.book.authors[0]
  }

  valueByDefaultGenre = () => {
    if (this.state.genreBook) {
      return this.state.genreBook
    } else return this.props.book.genre.id
  }


  render() {
    const { book, genres } = this.props;

    if (book === null || !book) { return (<Progress />) }
    return (
      <div>
        <div >
          <div>
            <img src={book.cover ? book.cover : require("./../../../../img/book.png")} alt="book" width="226" height="300" />
          </div>
        </div>
        <div>
          <TextField floatingLabelText="Book name" hintText="Book name" value={this.valueByDefaultName()} />
          {
            book.authors.length > 2 ? book.authors.map(a => { <TextField hintText="Author name" defaultValue={a} /> }) :
              <TextField floatingLabelText="Author name" hintText="Author name" value={this.valueByDefaultAuthor()} />
          }
          <SelectField
            floatingLabelText="Genre"
            hintText="Change a Genre"
            value={this.valueByDefaultGenre()}
            onChange={this.handleGenresSelectedChange}
          >{
              Array.isArray(genres) ? genres.map(
                (genre, index) =>
                  <MenuItem key={index} value={genre.id} primaryText={genre.name} />
              ) : <MenuItem value="none" primaryText="none" />
            }
          </SelectField>
        </div>
        <Button className="item-flex" label="Add" onClick={this.handleAddClick} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    genres: state.allGenres,
    book: state.openedBook,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    adminGetBookById: ActionCreators.adminGetBookById
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditBook)