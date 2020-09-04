import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebase-provider'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { useState } from 'react'
import { Loading } from '../components/loading/Loading'


export const AppRouter = () => {

  const dispatch = useDispatch()
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(( user ) => {
      if( user?.uid ) {
        dispatch(login( user.uid, user.displayName ))
        setIsLoggedIn(true)
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
          <Route path='/auth' component={ AuthRouter } />
          <Route exact path='/' component={ JournalScreen } />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
