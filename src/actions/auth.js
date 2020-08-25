import { types } from "../types/types";

export const startLoginEmailPwd = ( email, pwd ) => {
  return ( dispatch ) => {
    setTimeout(() => {
      dispatch(login(123, 'Daveepro'))
    }, 3500);    
  }
}

export const login = ( uid, displayName ) => ({
  type: types.login,
  payload: {
    uid, 
    displayName
  }
})