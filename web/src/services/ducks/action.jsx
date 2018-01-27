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
export const OPENED_USER_IS_LOGINED_USER = 'OPENED_USER_IS_LOGINED_USER'

export const BOOK_CREATED_SUCCESS = 'BOOK_CREATED_SUCCESS'
export const BOOK_CREATED_ERROR = 'BOOK_CREATED_ERROR'

export const BOOK_ADD_TO_COLLECTION_SUCCESS = 'BOOK_ADD_TO_COLLECTION_SUCCESS'
export const BOOK_ADD_TO_COLLECTION_ERROR = "BOOK_ADD_TO_COLLECTION_ERROR"

export const BOOK_REMOVE_FROM_COLLECTION_SUCCESS = 'BOOK_REMOVE_FROM_COLLECTION_SUCCESS'
export const BOOK_REMOVE_FROM_COLLECTION_ERROR = 'BOOK_REMOVE_FROM_COLLECTION_ERROR'

export const BOOKS_FETCH_REQUEST = "BOOKS_FETCH_REQUEST"
export const BOOKS_FETCH_SUCCESS = 'BOOKS_FETCH_SUCCESS'
export const BOOKS_FETCH_ERROR = 'BOOKS_FETCH_ERROR'

function reAuth(dispatch, params) {
  let refresh_token = new Promise((resolve, reject) => {
    let token = api.getCookie("refresh_token");
    resolve(token);
  });
  refresh_token.then(result => {
    api.refreshTokenRequest(result)
      .then(response => {
        api.set_cookie("key", response.data.access_token, response.data.expires_in, response.data.refresh_token)
        dispatch(params())
      }).catch(error => console.log(error));
  })
}


export function searchBooksRequest(searchQuery) {
  return function (dispatch) {
    dispatch({ type: FETCH_SEARCH_REQUEST })

    api.searchBooks(searchQuery)
      .then(response => {
        dispatch({
          type: SUCCESS_SEARCH_BOOKS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, searchBooksRequest(searchQuery))
        } else {
          dispatch({
            type: ERROR_SEARCH_BOOKS,
            payload: error.toString()
          })
        }
      }
      )
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
      ).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, loadingUsers)
        } else {
          dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.toString()
          })
        }
      }
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

    api.LoginOuath(email, password)
      .then((response) => {
        api.set_cookie("key", response.data.access_token, response.data.expires_in, response.data.refresh_token)
        api.fetchEmail({ email: email })
          .then((response) => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: response.data
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

    api.fetchUser(id).then((response) => {
      dispatch({
        type: USER_OPEN_SECCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, fetchUser(id))
      } else {
        dispatch({
          type: USER_OPEN_ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function addComment(comment) {
  return function (dispatch) {
    api.addComment(comment).then((response) => {
      dispatch({
        type: SEND_COMMENT_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, addComment(comment))
      } else {
        dispatch({
          type: ERROR_SEND_COMMENT,
          payload: error.toString()
        })
      }
    })
  }
}

export function creatBook(book) {
  return function (dispatch) {
    api.CreateBook(book)
      .then(response => {
        dispatch({
          type: BOOK_CREATED_SUCCESS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, creatBook(book))
        } else {
          dispatch({
            type: BOOK_CREATED_ERROR,
            payload: error.toString()
          })
        }
      })
  }
}


export function getBooks() {
  return function (dispatch) {
    dispatch({ type: BOOKS_FETCH_REQUEST })
    api.fetchBooks().then(response => {
      dispatch({
        type: BOOKS_FETCH_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, getBooks)
      } else {
        dispatch({
          type: BOOKS_FETCH_ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function openedIsLogined() {
  return function (dispatch) {
    dispatch({
      type: OPENED_USER_IS_LOGINED_USER
    })
  }
}

export function addToCollection(loginedUser, bookId) {
  return function (dispatch) {
    api.addBooksToUser({ userId: loginedUser, ids: bookId })
      .then(response => {
        dispatch({
          type: BOOK_ADD_TO_COLLECTION_SUCCESS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, addToCollection(loginedUser, bookId))
        } else {
          dispatch({
            type: BOOK_ADD_TO_COLLECTION_ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function removeFromCollectiom(userId, bookId) {
  return function (dispatch) {

    api.removeBookFromUser(userId, bookId)
      .then(response => {
        dispatch({
          type: BOOK_REMOVE_FROM_COLLECTION_SUCCESS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, removeFromCollectiom(userId, bookId))
        } else {
          dispatch({
            type: BOOK_REMOVE_FROM_COLLECTION_ERROR,
            payload: error.toString()
          })
        }
      })
  }
}
