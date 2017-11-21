export const LOGIN_USER_TRUE = 'LOGIN_USER_TRUE'


export function loginTrue(responce){
  return{
    type: LOGIN_USER_TRUE,
    payload: responce
  }
}