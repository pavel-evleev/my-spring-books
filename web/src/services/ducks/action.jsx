export const LOGIN_USER_TRUE = 'LOGIN_USER_TRUE'
export const LOADING_USERS = 'LOADING_USERS'
export const LOGGOUT_USER = 'LOGGOUT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export function loginTrue(responce) {
  return {
    type: LOGIN_USER_TRUE,
    payload: responce
  }
}

export function loadingUsers(responce) {
  return {
    type: LOADING_USERS,
    payload: responce
  }
}

export function loggoutUser() {
  return {
    type: LOGGOUT_USER,
    payload: false
  }
}

export function setCurrentUser(responce) {
  return {
    type: SET_CURRENT_USER,
    payload: responce
  }
}