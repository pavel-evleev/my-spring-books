import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import ImageUpload from './../ImageUpload'
import Spinner from './../MagicProgress'
import { notify } from 'react-notify-toast'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from './../../services/ducks/action'
import * as api from '../../services/API'

class AddBook extends React.Component {

  constructor(props) {
    super(props);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear());

    this.state = {
      maxDate: maxDate,
      hidden: '',
      name: '',
      arraySelectedAuthors: [],
      selectedAuthors: null,
      publisher: '',
      publishedDate: null,
      value: '',
      genreId: '',
      newAuthors: '',
      file: ''
    };
  }

  componentDidMount() {
    this.props.allAuthors()
    this.props.allGenres()
  }


  handleDateChange = (objNull, date) => {
    this.setState({ publishedDate: date });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handlenewAuthorsChange = (event) => {
    this.setState({ newAuthors: event.target.value });
  }

  handlePublisherChange = (event) => {
    this.setState({ publisher: event.target.value });
  }

  handleAuthorsSelectedChange = (event, index, value) => {
    this.setState({ arraySelectedAuthors: value });
    this.setState({ value });
  }

  handleGenresSelectedChange = (event, index, value) => {
    this.setState({ genreId: value })
  }

  handleAddClick = () => {
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('publisher', this.state.publisher)
    formData.append('datePublished', moment(this.state.publishedDate).format("YYYY-MM-DD"))
    formData.append('dateCreated', moment(Date.now()).format("YYYY-MM-DD"))
    formData.append('authorsIds', this.state.arraySelectedAuthors)
    formData.append('genreId', this.state.genreId)
    if (this.state.newAuthors.length > 0) {
      formData.append('newAuthors', this.state.newAuthors.split('\n'))
    }
    if (this.state.file) {
      formData.append('file', this.state.file, this.state.file.name)
    }
    this.props.creatBook(formData)
    // setTimeout(() => {
    //   this.props.history.push("/books")
    // }, 1001);
  }

  handleFile = (file) => {
    this.setState({ file: file })
  }

  render() {
    if(this.props.fetching)
      return (<Spinner/>)
    return (
      <div>
        <div style={{ margin: "0 25%", display: this.state.hidden }}>
          <ImageUpload handleFile={this.handleFile} />
          <TextField
            hintText="Book Name"
            floatingLabelText="Book Name"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <br />
          <TextField
            hintText="Publisher"
            floatingLabelText="Publisher"
            onChange={this.handlePublisherChange}
            value={this.state.publisher}
          />
          <br />

          <div>Add Authors....</div>
          <SelectField
            floatingLabelText="Authors"
            value={this.state.value}
            onChange={this.handleAuthorsSelectedChange}
            multiple={true}
          >
            {
              Array.isArray(this.props.authors) ? this.props.authors.map(
                (author, index) =>
                  <MenuItem key={index} value={author.id} primaryText={author.name} />
              ) : <MenuItem value="none" primaryText="none" />
            }
          </SelectField>
          <br />
          <SelectField
            floatingLabelText="Genre"
            value={this.state.genreId}
            onChange={this.handleGenresSelectedChange}
          >
            {
              Array.isArray(this.props.genres) ? this.props.genres.map(
                (genre, index) =>
                  <MenuItem key={index} value={genre.id} primaryText={genre.name} />
              ) : <MenuItem value="none" primaryText="none" />
            }
          </SelectField>
          <br />
          <TextField
            multiLine={true}
            hintText="New author"
            floatingLabelText="New Author"
            onChange={this.handlenewAuthorsChange}
            value={this.state.newAuthors}
          />
          <br />
          <DatePicker hintText="Published Date"
            floatingLabelText="Published Date"
            autoOk={true}
            maxDate={this.state.maxDate}
            value={this.state.publishedDate}
            onChange={this.handleDateChange}
          />
          <RaisedButton label="Add" onClick={this.handleAddClick} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    books: state.allBooks,
    authors: state.allAuthors,
    genres: state.allGenres,
    authorizedUserId: state.authorizedUser.id,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    creatBook: ActionCreators.creatBook,
    allAuthors: ActionCreators.loadAllAuthors,
    allGenres: ActionCreators.loadAllGenres
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)