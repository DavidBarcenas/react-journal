import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebase-provider'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { useState } from 'react'
import { Loading } from '../components/loading/Loading'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { loadNotes } from '../helpers/loadNotes'
import { setNotes } from '../actions/notes'


export const AppRouter = () => {

  const dispatch = useDispatch()
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async ( user ) => {
      if( user?.uid ) {
        dispatch(login( user.uid, user.displayName ))
        setIsLoggedIn( true )
        const notes = await loadNotes( user.uid )
        dispatch(setNotes( notes ))
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [ dispatch, setChecking, setIsLoggedIn ])

  if( checking ) {
    return (
      <div className="auth__main">
        <Loading color={'white'}/>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuth={ isLoggedIn } path='/auth' component={ AuthRouter } />
          <PrivateRoute exact isAuth={ isLoggedIn } path='/' component={ JournalScreen } />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
