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
	if(action.type === UserAction.LOGIN_USER_TRUE){
		return state.merge({login: action.payload})
  }
  if(action.type === UserAction.LOGGOUT_USER){
    return state.merge({login: action.payload})
  }
	return state
}

const userReducer = (state = userState, action) =>{
  if(action.type === UserAction.LOADING_USERS){
    return state.merge({users: action.payload})
  }

	return state
}


export default combineReducers(	
	{
		loginReducer,
		userReducer
	}
)
