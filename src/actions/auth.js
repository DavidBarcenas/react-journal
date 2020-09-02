import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-provider';     

/**
 * startLoginEmailPwd // async action
 */
export const startLoginEmailPwd = ( email, pwd ) => {
  return ( dispatch ) => {
    firebase.auth().signInWithEmailAndPassword( email, pwd )
      .then( ({ user }) => {
        console.log(user)
        dispatch(login( user.uid, user.displayName ))
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
      .catch( e => console.log(e))
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