import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import * as UserAction from './action'


const loginState = Immutable({
  login: true
})

const userState = Immutable({
  users: ['Alex', 'Pasha'],

})

const booksState = Immutable({
  allBooks: [{ id: 1, name: "BookName", authors: "author1 author2", description: "Краткое описание книги" },
  { id: 2, name: "BookName Long name book not longer then 49 symbol123", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 3, name: "BookName", authors: "author1", description: "Краткое описание книги" },
  { id: 4, name: "BookName", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 5, name: "BookName", authors: "author1 author2", description: "Краткое описание книги или не очень короткое описание" },
  { id: 6, name: "BookName", authors: "author1 author2 author3", description: "Краткое описание книги" },
  { id: 7, name: "BookName", authors: "author1 author2", description: "Краткое описание книги или не очень короткое описание" }
  ],

})



const loginReducer = (state = loginState, action) => {

  switch (action.type) {
    case UserAction.LOGIN_USER_TRUE:
      return state.merge({ login: action.payload })
    case UserAction.LOGGOUT_USER:
      return state.merge({ login: action.payload })
    default:
      return state
  }
}

const userReducer = (state = userState, action) => {

  switch (action.type) {
    case UserAction.SET_CURRENT_USER:
      return state.merge({ currentUser: action.payload })
    case UserAction.LOADING_USERS:
      return state.merge({ users: action.payload })
    default:
      return state
  }

}

const booksReducer = (state = booksState, action) => {

  switch (action.type) {
    // case UserAction.SET_CURRENT_USER:
    //   return state.merge({ currentUser: action.payload })
    // case UserAction.LOADING_USERS:
    //   return state.merge({ users: action.payload })
    default:
      return state
  }

}


export default combineReducers(
  {
    loginReducer,
    booksReducer,
    userReducer
  }
)
