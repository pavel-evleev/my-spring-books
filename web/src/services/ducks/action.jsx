import * as api from './../API'

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const LOGGOUT_USER = 'LOGGOUT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"


export function loadingUsers() {
  return function (dispatch) {
    dispatch({ type: FETCH_USERS_REQUEST })

    api.fetchUsers()
      .then(response =>
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: error.toString()
        })
      )
  }
}

export function loggoutUser() {
  return {
    type: LOGGOUT_USER,
    payload: false
  }
}


export function requestLogin(email, password) {
  return function (dispatch) {
    dispatch({ type: FETCH_USERS_REQUEST })

    api.Login(email, password)
      .then(() => {
        api.fetchEmail({ email: email })
          .then(responce => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: responce.data.id
            })
          }).catch(error =>
            dispatch({
              type: FETCH_USERS_FAILURE,
              payload: error.toString()
            })
          )
      })
  }
}