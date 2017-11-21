import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'


const loginState = Immutable({
	login: false
})

const userState = Immutable({
	users: ['Alex', 'Pasha'],
	
})


const loginReducer = (state = loginState, action) => {
	if(action.type === 'LOGIN_USER_TRUE'){
		return state.merge({login: action.responce})
	}
	return state
}

const userReducer = (state = userState, action) =>{
	return state
}


export default combineReducers(	
{
	loginReducer,
	userReducer
})