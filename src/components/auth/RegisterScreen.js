import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>
        <input type="text" className="auth__input" placeholder="Name" name="name"/>
        <input type="email" className="auth__input" placeholder="Email" name="mail"/>
        <input type="password" className="auth__input" placeholder="Password" name="pwd"/>
        <input type="password" className="auth__input" placeholder="Password confirm" name="pwdConfirm"/>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>

      <Link to="/auth/login" className="auth__social-text"> Already registered?</Link>
    </>
  )
}
