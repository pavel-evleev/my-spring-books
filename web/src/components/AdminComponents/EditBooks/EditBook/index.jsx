import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../../../services/ducks/action'
import Button from './../../../Button'
import Progress from './../../../MagicProgress'
import ImageUpload from './../../../ImageUpload'

class EditBook extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nameBook: null,
      nameAuthor: null,
      genreBook: null,
      checked: null,
      authors: null,
      publisher: null,
      file: null
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.bookId)
    this.props.adminGetBookById(id)
    this.props.getAllAuthors()
  }

  handleNameChange = (event) => {
    this.setState({ nameBook: event.target.value });
  }

  handlePublisherChange = (event) => {
    this.setState({ publisher: event.target.value });
  }

  handlenewAuthorsChange = (event) => {
    this.setState({ nameAuthor: event.target.value });
  }

  handleAuthorsSelectedChange = (event, index, value) => {
    this.setState({ authors: value })
  }

  handleGenresSelectedChange = (event, index, value) => {
    this.setState({ genreBook: value })
  }

  defaultValueIfNotExistName = () => {
    if (this.state.nameBook !== null) {
      return this.state.nameBook
    } else return this.props.book.name
  }

  defaultValueIfNotExistPublisher = () => {
    if (this.state.publisher !== null) {
      return this.state.publisher
    } else return this.props.book.publisher

  }
  defaultValueIfNotExistAuthors = () => {
    if (this.state.authors !== null) {
      return this.state.authors
    } else return this.props.book.authors[0].id
  }

  defaultValueIfNotExistAuthor = () => {
    if (this.state.nameAuthor !== null) {
      return this.state.nameAuthor
    } else return this.props.book.authors[0].name
  }

  defaultValueIfNotExistGenre = () => {
    if (this.state.genreBook !== null) {
      return this.state.genreBook
    } else return this.props.book.genre.id
  }

  defaultValueCheck = () => {
    if (this.state.checked !== null)
      return this.state.checked
    return this.props.book.approve
  }

  updateCheck = (e, b) => {
    this.setState({ checked: b });
  }

  handleFile = (file) => {
    this.setState({ file: file })
  }

  imagePreview = (cover) => {
    if (cover)
      return (<img src={cover} alt="book" width="210" />)
    return null
  }

  handleSubmit = () => {
    const patch = new FormData()
    patch.append('bookId', this.props.book.id)

    if (this.state.file !== null)
      patch.append('file', this.state.file)
    if (this.state.checked !== null)
      patch.append('approve', this.state.checked)
    if (this.state.nameBook)
      patch.append('name', this.state.nameBook)
    if (this.state.genreBook)
      patch.append('genreId', this.state.genreBook)
    if (this.state.publisher)
      patch.append('publisher', this.state.publisher)
    if (this.state.authors !== null) {
      if (this.state.authors !== 'none') {
        patch.append('authorsIds', this.state.authors)
      }
    }
    if (this.state.nameAuthor !== null) {
      this.state.nameAuthor.length > 0 ? patch.append('newAuthors', this.state.nameAuthor.split('\n')) : ''
    }
    this.props.patchBook(patch)
  }

  render() {
    const { book, genres, authors } = this.props;

    if (book === null || !book) { return (<Progress />) }
    return (
      <div>
        <div >
          <div>
            <ImageUpload handleFile={this.handleFile} currentImg={this.imagePreview(book.cover)} className="size-img-uploader" />
          </div>
        </div>
        <div>
          <Checkbox label="approve" checked={this.defaultValueCheck()} onCheck={this.updateCheck} />
        </div>
        <div>
          <TextField floatingLabelText="Book name" hintText="Book name"
            value={this.defaultValueIfNotExistName()} onChange={this.handleNameChange} />

          <TextField floatingLabelText="Publisher name" hintText="Publisher name"
            value={this.defaultValueIfNotExistPublisher()} onChange={this.handlePublisherChange} />
          {
            book.authors.length > 2
              ? book.authors.map(a => { <TextField hintText="Author name" defaultValue={a} /> }) :
              <TextField floatingLabelText="Author name" hintText="Author name"
                value={this.defaultValueIfNotExistAuthor()} onChange={this.handlenewAuthorsChange} />
          }
          <SelectField
            floatingLabelText="Authors"
            hintText="Change a Authors"
            value={this.defaultValueIfNotExistAuthors()}
            onChange={this.handleAuthorsSelectedChange}
          >{
              Array.isArray(authors) ? authors.map(
                (author, index) =>
                  <MenuItem key={index} value={author.id} primaryText={author.name} />
              ) : ''
            }
            <MenuItem value="none" primaryText="none" />
          </SelectField>
          <SelectField
            floatingLabelText="Genre"
            hintText="Change a Genre"
            value={this.defaultValueIfNotExistGenre()}
            onChange={this.handleGenresSelectedChange}
          >{
              Array.isArray(genres) ? genres.map(
                (genre, index) =>
                  <MenuItem key={index} value={genre.id} primaryText={genre.name} />
              ) : <MenuItem value="none" primaryText="none" />
            }
          </SelectField>
        </div>
        <Button className="item-flex" label="Submit" onClick={this.handleSubmit} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    genres: state.allGenres,
    authors: state.allAuthors,
    book: state.openedBook,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    adminGetBookById: ActionCreators.adminGetBookById,
    getAllAuthors: ActionCreators.adminGetAuthors,
    patchBook: ActionCreators.patchBook
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditBook)