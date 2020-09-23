import { types } from "../types/types";
import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from '../firebase/firebase-provider';     
import { startLoading, finishLoading } from "./ui";

/**
 * startLoginEmailPwd // async action
 */
export const startLoginEmailPwd = ( email, pwd ) => {
  return ( dispatch ) => {
    dispatch( startLoading() )
    firebase.auth().signInWithEmailAndPassword( email, pwd )
      .then( ({ user }) => {
        dispatch(login( user.uid, user.displayName ))
        dispatch( finishLoading() )
      })
      .catch( e => {
        // console.log(e)
        dispatch( finishLoading() )
        Swal.fire('Fail', e.message, 'error')
      })
  }
}

export const startRegister = ( email, pwd, name ) => {
  return ( dispatch ) => {
    firebase.auth().createUserWithEmailAndPassword( email, pwd )
      .then( async({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login( user.displayName, user.name ))
      })
      .catch( e => {
        // console.log(e)
        Swal.fire('Fail', e.message, 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return ( dispatch ) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({ user }) => {
        dispatch(login( user.uid, user.displayName ))
      })
  }
}

export const login = ( uid, displayName ) => ({
  type: types.login,
  payload: {
    uid, 
    displayName
  }
})

export const startLogout = () => {
  return async( dispatch ) => {
    await firebase.auth().signOut()
    dispatch( logout() )
    dispatch( notesCleaning() )
  }
}

export const logout = () => ({
  type: types.logout
})

export const notesCleaning = () => ({
  type: types.noteLogoutCleaning
})