import React from 'react'
import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'

import MyTextField from './../TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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


  dateToISO8601 = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  handleDateChange = (objNull, date) => {
    this.setState({ publishedDate: date });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handlenewAuthorsChange = (authors) => {
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
    formData.append('datePublished', this.dateToISO8601(this.state.publishedDate))
    formData.append('dateCreated', this.dateToISO8601(Date.now()))
    formData.append('authorsIds', authorsIds)
    formData.append('genreId', this.state.genreId)
    if (newAuthors.length > 0) {
      formData.append('newAuthors', newAuthors)
    }
    if (this.state.file) {
      formData.append('file', this.state.file, this.state.file.name)
    }
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
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block" }}>Authors</label>
              <ChipInput
                style={{ width: "256px" }}
                underlineStyle={{ width: "256px" }}
                hintText="Authors"
                textFieldStyle={{ width: "246px", height: "40px" }}
                inputStyle={{
                  marginTop: "10px",
                  marginBottom: "0px",
                  padding: "0 5px",
                  width: "246px", height: "44px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px",
                  backgroundColor: "white",
                  borderRadius: "10px"
                }}
                dataSource={dataSource}
                dataSourceConfig={dataSourceConfig}
                onChange={this.handlenewAuthorsChange}
              />
            </div>
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