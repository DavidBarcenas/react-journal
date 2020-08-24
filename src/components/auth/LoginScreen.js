import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {
  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form>
        <input type="email" className="auth__input" placeholder="Email" name="mail"/>
        <input type="password" className="auth__input" placeholder="Password" name="pwd"/>
        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
      </form>

      <div>
        <span className="auth__social-text">Login with social networks</span>
        <button className="btn btn-block btn__google" >
          <div className="btn__google-img" >
            <img src="/images/google.svg" alt="google"/>
          </div>
          <span>Sign in with google</span>
        </button>

        <Link to="/auth/register" className="auth__social-text"> Create new account </Link>
      </div>
    </>
  )
}
