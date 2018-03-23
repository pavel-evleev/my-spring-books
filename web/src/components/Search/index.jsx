import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import CloseFilter from 'material-ui/svg-icons/content/clear'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './../../services/ducks/action'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
      open: false,
      height: "0px"
    }
  }

  syncDataForSearch = () => {
    this.props.allAuthors()
    this.props.allGenres()
  }
  openFilter = () => {
    this.setState({ open: true, height: "300px" })
    if (this.props.Authors.length === 0 && this.props.Genres.length === 0) {
      this.syncDataForSearch()
    }
  }
  closeFilter = () => {
    this.setState({ open: false, height: "0px" })
  }
  handleOnClick = () => {
    const searchPage = this.props.searchPage
    //если клик пришёл из вьюхи книги, то редиректим на вьюху поиска, иначе отправляем запрос
    if (this.state.searchText || this.state.authors || this.state.genreBook) {
      if (searchPage) {
        this.search()
      } else {
        this.search()
        this.props.history.push(`/search-books`)
      }
    }
  }

  search = () => {
    const book = {
      name: this.state.searchText,
      genre: this.state.genreBook ? {
        id: this.state.genreBook
      } : null,
      authors: this.state.authors ? [{ id: this.state.authors }] : null
    }
    this.props.searchBooksRequest(book)
  }

  handleAuthorsSelectedChange = (event, index, value) => {
    this.setState({ authors: value === 'none' ? null : value })
  }
  handleGenresSelectedChange = (event, index, value) => {
    this.setState({ genreBook: value === 'none' ? null : value })
  }
  defaultValueIfNotExistAuthors = () => {
    if (this.state.authors !== null) {
      return this.state.authors
    } else return null
  }
  defaultValueIfNotExistGenre = () => {
    if (this.state.genreBook !== null) {
      return this.state.genreBook
    } else return null
  }
  render() {
    return (
      <div style={{ height: "48px" }}>
        <IconButton>
          {
            this.state.open ? <CloseFilter onClick={() => this.closeFilter()} /> : <FilterList onClick={() => this.openFilter()} />
          }
        </IconButton>
        <div className="shadow filter" style={{
          marginTop: "0px", marginBottom: "0px", padding: "0px 10px", overflow: "hidden",
          maxHeight: `${this.state.height}`, transition: "max-height 800ms ease-in-out 0ms",
          position: "absolute", zIndex: 1
        }}>
          <TextField name="search" value={this.state.searchText}
            onChange={(event) => this.setState({ searchText: event.target.value })} hintText="Part of name Book" floatingLabelText="Search Book" />
          <SelectField
            floatingLabelText="Authors"
            hintText="Change a Authors"
            value={this.defaultValueIfNotExistAuthors()}
            onChange={this.handleAuthorsSelectedChange}
          >{
              Array.isArray(this.props.Authors) ? this.props.Authors.map(
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
              Array.isArray(this.props.Genres) ? this.props.Genres.map(
                (genre, index) =>
                  <MenuItem key={index} value={genre.id} primaryText={genre.name} />
              ) : ''
            }
            <MenuItem value="none" primaryText="none" />
          </SelectField>
          <IconButton>
            <SearchIcon onClick={() => this.handleOnClick()} />
          </IconButton>
        </div>
      </div>
    )
  }

}
Search.defaultProps = {
  searchPage: false
}

const mapStateToProps = (state) => {
  return {
    Authors: state.allAuthors,
    Genres: state.allGenres
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    searchBooksRequest: ActionCreators.searchBooksRequest,
    allAuthors: ActionCreators.loadAllAuthors,
    allGenres: ActionCreators.loadAllGenres
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))