import React from 'react'
import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import MyTextField from './../TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import Button from './../Button'
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
      selectedAuthors: null,
      publisher: '',
      publishedDate: null,
      value: '',
      genreId: '',
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

  handlenewAuthorsChange = (authors) => {
    console.log(authors)
    this.setState({ selectedAuthors: authors });
  }

  handlePublisherChange = (event) => {
    this.setState({ publisher: event.target.value });
  }

  handleGenresSelectedChange = (event, index, value) => {
    this.setState({ genreId: value })
  }

  handleAddClick = () => {
    const authorsIds = this.state.selectedAuthors.filter((a) => typeof a.id === 'number').map(a => a.id)
    const newAuthors = this.state.selectedAuthors.filter((a) => typeof a.id === 'string').map(a => a.value)
    const formData = new FormData()
    formData.append('userId', this.props.authorizedUserId)
    formData.append('name', this.state.name)
    formData.append('publisher', this.state.publisher)
    formData.append('datePublished', moment(this.state.publishedDate).format("YYYY-MM-DD"))
    formData.append('dateCreated', moment(Date.now()).format("YYYY-MM-DD"))
    formData.append('authorsIds', authorsIds)
    formData.append('genreId', this.state.genreId)
    if (newAuthors.length > 0) {
      formData.append('newAuthors', newAuthors)
    }
    if (this.state.file) {
      formData.append('file', this.state.file, this.state.file.name)
    }
    // console.log(authorsIds)
    // console.log(newAuthors)
   
    this.props.creatBook(formData)
  }

  handleFile = (file) => {
    this.setState({ file: file })
  }

  render() {
    const dataSource = this.props.authors.map(a => ({ id: a.id, value: a.name }))
    const dataSourceConfig = { text: 'value', value: 'id' }
    if (this.props.fetching)
      return (<Spinner />)
    return (
      <div className="add-b-grid">
        <ImageUpload handleFile={this.handleFile} className="size-img-uploader" />
        <div className="text-fields">
          <MyTextField
            hintText="Book Name"
            floatingLabelText="Book Name"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <MyTextField
            hintText="Publisher"
            floatingLabelText="Publisher"
            onChange={this.handlePublisherChange}
            value={this.state.publisher}
          />
          <div style={{ width: "fit-content" }}>
            <label>Genre</label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                backgroundColor: "white",
                top: "7px", left: 0, right: 0, bottom: 0,
                height: "34px", borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
              }}></div>
            </div>
            <SelectField
              hintText="Select a Genre"
              value={this.state.genreId}
              onChange={this.handleGenresSelectedChange}
              inputStyle={{ padding: "0px 5px" }}
              floatingLabelStyle={{ paddingLeft: "5px" }}
              floatingLabelFocusStyle={{ paddingLeft: "5px", color: "black" }}
              hintStyle={{ left: "5px" }}
              underlineShow={false}
            >
              {
                Array.isArray(this.props.genres) ? this.props.genres.map(
                  (genre, index) =>
                    <MenuItem key={index} value={genre.id} primaryText={genre.name} />
                ) : <MenuItem value="none" primaryText="none" />
              }
            </SelectField>
            <label>Authors</label>
            <Paper style={{ borderRadius: "10px", marginBottom:"20px" }} zDepth={2} >
            <ChipInput
              style={{ padding: "0 5px", borderRadius: "5px", width: "250px" }}
              underlineStyle={{ width: "250px" }}
              hintText="Authors"
              inputStyle={{ marginBottom: "0px", width: "250px", height: "53px" }}
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              onChange={this.handlenewAuthorsChange}
            />
          </Paper>
          </div>
          <div style={{ width: "fit-content" }}>
            <label>Date Published</label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                backgroundColor: "white", top: "7px", left: 0,
                right: 0, bottom: 0, height: "34px",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
              }}></div>
            </div>
            <DatePicker hintText="Published Date"
              autoOk={true}
              maxDate={this.state.maxDate}
              value={this.state.publishedDate}
              onChange={this.handleDateChange}
              inputStyle={{ padding: "0px 5px" }}
              hintStyle={{ left: "5px" }}
              underlineShow={false}
            />
          </div>

          <Button className="item-flex" label="Add" onClick={this.handleAddClick} />
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