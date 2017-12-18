import * as api from './../API'

export const START_WAITING = "START_WAITING"
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const LOADING_USERS = 'LOADING_USERS'
export const LOGGOUT_USER = 'LOGGOUT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const CATCH_ERROR = "CATCH_ERROR"


export function loadingUsers() {
  return function (dispatch) {
    dispatch({
      type: START_WAITING,
      payload: true
    })

    api.fetchUsers()
      .then((response) => {
        dispatch({
          type: LOADING_USERS,
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CATCH_ERROR,
          payload: error.toString()
        })
      })

    setTimeout(() => {
      dispatch({
        type: START_WAITING,
        payload: false
      })
    }, 1000)
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
    dispatch({
      type: START_WAITING,
      payload: true
    })

    api.Login(email, password)
      .then(() => {
        api.fetchEmail({ email: email })
          .then((responce) => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: responce.data.id
            })

            dispatch({
              type: SUCCESS_LOGIN,
              payload: true
            })

            setTimeout(() => {
              dispatch({
                type: START_WAITING,
                payload: false
              })
            }, 1500)

          })
      })
  }
}