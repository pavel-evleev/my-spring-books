import * as api from './../API'

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
export const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST"
export const SUCCESS_SEARCH_BOOKS = "SUCCESS_SEARCH_BOOKS"
export const ERROR_SEARCH_BOOKS = "ERROR_SEARCH_BOOKS"
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const LOGGOUT_USER = 'LOGGOUT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS'
export const ERROR_SEND_COMMENT = 'ERROR_SEND_COMMENT'

export const USER_OPEN_REQUEST = 'USER_OPEN_REQUEST'
export const USER_OPEN_SECCESS = 'USER_OPEN_SECCESS'
export const USER_OPEN_ERROR = 'USER_OPEN_ERROR'

export function searchBooksRequest(searchQuery) {
  return function (dispatch) {
    dispatch({ type: FETCH_SEARCH_REQUEST })

    api.searchBooks(searchQuery)
      .then(response => {
        dispatch({
          type: SUCCESS_SEARCH_BOOKS,
          payload: response.data
        })
      }).catch(error =>
        dispatch({
          type: ERROR_SEARCH_BOOKS,
          payload: error.toString()
        }))
  }
}

export function loadingUsers() {
  return function (dispatch) {
    dispatch({ type: FETCH_USERS_REQUEST })

    api.fetchUsers()
      .then(response =>
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data
        })
      ).catch(error =>
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: error.toString()
        }))
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

    api.LoginOuath(email, password)
      .then((response) => {
        api.set_cookie("key", response.data.access_token, response.data.expires_in)
        api.fetchEmail({ email: email })
          .then((response) => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: response.data.id
            })
          }).catch(error =>
            dispatch({
              type: FETCH_USERS_FAILURE,
              payload: error.toString()
            })
          )
      }).catch(error =>
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: error.toString()
        })
      )
  }
}

export function fetchUser(id) {
  return function (dispatch) {
    dispatch({ type: USER_OPEN_REQUEST })

    api.fetchUser(id).then((response)=>{
        dispatch({
          type: USER_OPEN_SECCESS,
          payload: response.data
        })
    }).catch(error=>{
      dispatch({
        type: USER_OPEN_ERROR,
        payload: error.toString()
      })
    })
  }
}

export function addComment(comment) {
  return function (dispatch) {
    api.addComment(comment).then((response) => {
      console.clear()
      console.log(response.data)
        dispatch({
          type: SEND_COMMENT_SUCCESS,
          payload: response.data
        })
      }).catch(error =>
        dispatch({
          type: ERROR_SEND_COMMENT,
          payload: error.toString()
        }))
  }
}


