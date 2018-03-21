import React from 'react'
import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'
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
    formData.append('userId', this.props.authorizedUserId)
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
    // if (this.state.newAuthors.length === 0 & this.state.arraySelectedAuthors.length === 0)
    //   return
    this.props.creatBook(formData)
    // setTimeout(() => {
    //   this.props.history.push("/books")
    // }, 1001);
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
            <label>Authors</label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                backgroundColor: "white",
                top: "7px", left: 0, right: 0,
                bottom: 0, height: "34px",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
              }}></div>
            </div>

            <ChipInput
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              // onBeforeRequestAdd={(...args)=>{console.log(args); return true}}
              // onRequestAdd={(chip) => { handleAddChip(chip); console.log(chip) }}
              onChange={(...args) => console.log(args)}
            />
            <SelectField
              hintText="Select a Authors"
              value={this.state.value}
              onChange={this.handleAuthorsSelectedChange}
              multiple={true}
              inputStyle={{ padding: "0px 5px" }}
              floatingLabelStyle={{ paddingLeft: "5px" }}
              floatingLabelFocusStyle={{ paddingLeft: "5px", color: "black" }}
              hintStyle={{ left: "5px" }}
              underlineShow={false}
            >
              {
                Array.isArray(this.props.authors) && this.props.authors.length > 0 ? this.props.authors.map(
                  (author, index) =>
                    <MenuItem key={index} value={author.id} primaryText={author.name} />
                ) : <MenuItem value="none" primaryText="none" />
              }
            </SelectField>
          </div>
          <div style={{ marginTop: "-28px", width: "fit-content" }} >
            <MyTextField
              multiLine={true}
              hintText="New author"
              floatingLabelText="New Author"
              onChange={this.handlenewAuthorsChange}
              value={this.state.newAuthors}
            />
          </div>
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