import Immutable from 'seamless-immutable'
import * as UserAction from './action'


const store = Immutable({
  login: true,
  fetching: false,
  allBooks: [{ id: 1, name: "BookName", authors: "author1 author2", description: "Краткое описание книги" },
  { id: 2, name: "BookName Long name book not longer then 49 symbol123", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 3, name: "BookName", authors: "author1", description: "Краткое описание книги" },
  { id: 4, name: "BookName", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 5, name: "BookName", authors: "author1 author2", description: "Краткое описание книги или не очень короткое описание" },
  { id: 6, name: "BookName", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 7, name: "BookName", authors: "author1 author2", description: "Краткое описание книги или не очень короткое описание" }
  ],
  users: ['Alex', 'Pasha']
})

const rootReducer = (state = store, action) => {

  switch (action.type) {
    case UserAction.FETCH_USERS_REQUEST:
      return state.merge({ fetching: true, users: [], error: null })
    case UserAction.FETCH_USER_SUCCESS:
      return state.merge({ fetching: false, users: action.payload })
    case UserAction.SET_CURRENT_USER:
      return state.merge({ currentUser: action.payload, fetching: false, login: true })
    case UserAction.LOGGOUT_USER:
      return state.merge({ login: action.payload, currentUser: null })
    case UserAction.FETCH_USERS_FAILURE:
      return state.merge({ error: action.payload, fetching: false })
    case UserAction.FETCH_SEARCH_REQUEST:
      return state.merge({ fetching: true, searchedBooks: [], error: null })
    case UserAction.SUCCESS_SEARCH_BOOKS:
      return state.merge({ searchedBooks: action.payload, fetching: false })
    case UserAction.ERROR_SEARCH_BOOKS:
      return state.merge({ fetching: false, error: action.payload })
    case UserAction.SEND_COMMENT_SUCCESS:
      return state.merge({ allBooks: action.payload })
    case UserAction.ERROR_SEND_COMMENT:
      return state.merge({ error: action.payload })
    case UserAction.USER_OPEN_REQUEST:
      return state.merge({ fetching: true, openedUser: null, allBooks: null })
    case UserAction.USER_OPEN_SECCESS:
      return state.merge({ fetching: false, openedUser: action.payload, allBooks: action.payload.books })
    case UserAction.USER_OPEN_ERROR:
      return state.merge({ fetching: false, error: action.payload })

    default:
      return state
  }
}

export default rootReducer
