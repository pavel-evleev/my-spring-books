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
      return state.merge({ fetching: true, users: [] })
    case UserAction.FETCH_USER_SUCCESS:
      return state.merge({ fetching: false, users: action.payload })
    case UserAction.SET_CURRENT_USER:
      return state.merge({ currentUser: action.payload, fetching: false, login: true })
    case UserAction.LOGGOUT_USER:
      return state.merge({ login: action.payload, currentUser: null  })
    default:
      return state
  }
}

export default rootReducer
