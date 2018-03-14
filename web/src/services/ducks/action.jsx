import * as api from './../API'
import CryptoJS from 'crypto-js'


const keyEncrypt = 'myReadedBooks25ItStep'

export const ERROR= "ERROR"


export const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST"
export const SUCCESS_SEARCH_BOOKS = "SUCCESS_SEARCH_BOOKS"

export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const LOGGOUT_USER = 'LOGGOUT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS'

export const USER_OPEN_REQUEST = 'USER_OPEN_REQUEST'
export const USER_OPEN_SECCESS = 'USER_OPEN_SECCESS'
export const OPENED_USER_IS_LOGINED_USER = 'OPENED_USER_IS_LOGINED_USER'

export const BOOK_CREATED_REQUEST = 'BOOK_CREATED_REQUEST'
export const BOOK_CREATED_SUCCESS = 'BOOK_CREATED_SUCCESS'

export const BOOK_ADD_TO_COLLECTION_SUCCESS = 'BOOK_ADD_TO_COLLECTION_SUCCESS'

export const BOOK_REMOVE_FROM_COLLECTION_SUCCESS = 'BOOK_REMOVE_FROM_COLLECTION_SUCCESS'

export const BOOKS_FETCH_REQUEST = "BOOKS_FETCH_REQUEST"
export const BOOKS_FETCH_SUCCESS = 'BOOKS_FETCH_SUCCESS'

export const BOOK_FETCH_REQUEST = 'BOOK_FETCH_REQUEST'
export const BOOK_FETCH_SUCCESS = 'BOOK_FETCH_SUCCESS'

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST"
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'

export const GET_AUTHOR_REQUEST = "GET_AUTHOR_REQUEST"
export const GET_AUTHOR_SUCCESS = 'GET_AUTHOR_SUCCESS'

export const AUTHOR_EDIT_REQUEST = "AUTHOR_EDIT_REQUEST"
export const AUTHOR_EDIT_SUCCESS = 'AUTHOR_EDIT_SUCCESS'

export const AUTHORS_FETCH_REQUEST = "AUTHORS_FETCH_REQUEST"
export const AUTHORS_FETCH_SUCCESS = "AUTHORS_FETCH_SUCCESS"

export const LIKE_BOOK_SUCCESS = "LIKE_BOOK_SUCCESS"

export const GENRES_FETCH_REQUEST = "GENRES_FETCH_REQUEST"
export const GENRES_FETCH_SUCCESS = "GENRES_FETCH_SUCCESS"

export const AVATAR_CHANGE_SUCCESS = "AVATAR_CHANGE_SUCCESS"

export const ADMIN_MOD_ACTIVATED = "ADMIN_MOD_ACTIVATED"

export const TOGGLE_APPROVE_SUCCESS = 'TOGGLE_APPROVE_SUCCESS'


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
            type: ERROR,
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

export function loggoutUser(id) {
  return function (dispatch) {
    dispatch({
      type: LOGGOUT_USER,
      payload: false
    })
    api.logout(id).then(() => {
      api.removeCredentials()
    })
  }

}


export function requestLogin(email, password) {
  return function (dispatch) {
    dispatch({ type: FETCH_USERS_REQUEST })

    api.LoginOuath(email, password)
      .then((response) => {
        localStorage.setItem('a', CryptoJS.AES.encrypt(email, keyEncrypt).toString())
        api.set_cookie("key", response.data.access_token, response.data.expires_in, response.data.refresh_token)
        api.fetchEmail({ email: email })
          .then(resp => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: resp.data
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
          type: ERROR,
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
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function creatBook(book) {
  return function (dispatch) {
    dispatch({ type: BOOK_CREATED_REQUEST })
    api.CreateBook(book)
      .then(() => {
        dispatch({
          type: BOOK_CREATED_SUCCESS,
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, creatBook(book))
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function getBookById(id) {
  return function (dispatch) {
    dispatch({ type: BOOK_FETCH_REQUEST })
    api.fetchBook(id).then(response => {
      dispatch({ type: BOOK_FETCH_SUCCESS, payload: response.data })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, getBookById(id))
      } else {
        dispatch({
          type: ERROR,
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
          type: ERROR,
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
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function removeFromCollection(userId, bookId) {
  return function (dispatch) {

    api.removeBookFromUser(userId, bookId)
      .then(response => {
        dispatch({
          type: BOOK_REMOVE_FROM_COLLECTION_SUCCESS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, removeFromCollection(userId, bookId))
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function loginFromRefreshToken() {
  return function (dispatch) {
    let byte = localStorage.getItem("a")
    let refresh_token = api.getCookie("refresh_token")
    if (byte && refresh_token) {
      let email = CryptoJS.AES.decrypt(byte, keyEncrypt).toString(CryptoJS.enc.Utf8)
      reAuth(dispatch, () => {
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
      })
    }
  }
}


export function loadAllAuthors() {
  return function (dispatch) {
    dispatch({ type: AUTHORS_FETCH_REQUEST })
    api.fetchAuthors().then(
      response => {
        dispatch({
          type: AUTHORS_FETCH_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, loadAllAuthors)
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}


export function loadAllGenres() {
  return function (dispatch) {
    dispatch({ type: GENRES_FETCH_REQUEST })
    api.fetchGenres().then(
      response => {
        dispatch({
          type: GENRES_FETCH_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, loadAllGenres)
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function toggleLikeBook(likedBook) {
  return function (dispatch) {
    api.toggleLikeBook(likedBook).then(
      response => {
        dispatch({
          type: LIKE_BOOK_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, toggleLikeBook(likedBook))
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}



export function changeAvatar(file, userId) {
  return function (dispatch) {
    const imgUpload = new FormData()
    imgUpload.append('file', file, file.name)
    imgUpload.append('userId', userId)
    api.changeAvatar(imgUpload).then(
      response => {
        dispatch({
          type: AVATAR_CHANGE_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, changeAvatar(file))
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

/*
* Admin action
*/
export function toggleAdminMod(toggle) {
  return function (dispatch) {
    dispatch({
      type: ADMIN_MOD_ACTIVATED,
      payload: toggle
    })
  }
}

export function adminGetBooks() {
  return function (dispatch) {
    dispatch({ type: BOOKS_FETCH_REQUEST })
    api.adminGetBooks().then(response => {
      dispatch({
        type: BOOKS_FETCH_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, adminGetBooks)
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function adminGetBookById(id) {
  return function (dispatch) {
    dispatch({ type: BOOK_FETCH_REQUEST })
    api.adminGetBook(id).then(response => {
      dispatch({ type: BOOK_FETCH_SUCCESS, payload: response.data })
    }).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, adminGetBookById(id))
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function adminGetAuthors() {
  return function (dispatch) {
    dispatch({ type: AUTHORS_FETCH_REQUEST })
    api.adminGetAuthors().then(
      response => {
        dispatch({
          type: AUTHORS_FETCH_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, adminGetAuthors)
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function patchBook(book) {
  return function (dispatch) {
    dispatch({ type: BOOK_CREATED_REQUEST })
    api.patchBook(book)
      .then(() => {
        dispatch({
          type: BOOK_CREATED_SUCCESS,
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, patchBook(book))
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function getAuthor(id) {
  return function (dispatch) {
    dispatch({ type: GET_AUTHOR_REQUEST })
    api.adminGetAuthor(id)
      .then((response) => {
        dispatch({
          type: GET_AUTHOR_SUCCESS,
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, getAuthor(id))
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}

export function patchAuthor(a) {
  return function (dispatch) {
    dispatch({ type: AUTHOR_EDIT_REQUEST })
    api.patchAuthor(a)
      .then(() => {
        dispatch({
          type: AUTHOR_EDIT_SUCCESS,
        })
      }).catch(error => {
        if (error.response.status === 401) {
          reAuth(dispatch, patchAuthor(a))
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      })
  }
}


export function adminGetComments() {
  return function (dispatch) {
    dispatch({ type: GET_COMMENTS_REQUEST })
    api.adminGetComments().then(
      response => {
        dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, adminGetComments)
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}

export function adminToggleApproveComment(id) {
  return function (dispatch) {
    api.adminToggleApproveComment(id).then(
      response => {
        dispatch({
          type: TOGGLE_APPROVE_SUCCESS,
          payload: response.data
        })
      }
    ).catch(error => {
      if (error.response.status === 401) {
        reAuth(dispatch, adminToggleApproveComment(id))
      } else {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    })
  }
}