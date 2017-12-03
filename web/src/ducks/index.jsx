import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import * as UserAction from './action'


const loginState = Immutable({
  login: false
})

const userState = Immutable({
  users: ['Alex', 'Pasha'],

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


export default combineReducers(
  {
    loginReducer,
    userReducer
  }
)
