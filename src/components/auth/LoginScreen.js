import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { login } from '../../actions/auth'

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formValues, handleInputChange ] = useForm({
    email: 'davee@gmail.com',
    pwd: '123456'
  });

  const { email, pwd } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( login(12345, 'Davee') )
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={ handleLogin }>
        <input type="email" 
          className="auth__input" 
          placeholder="Email" 
          name="email" 
          value={ email } 
          onChange={ handleInputChange }
        />
        <input type="password" 
          className="auth__input" 
          placeholder="Password" 
          name="pwd" 
          value={ pwd } 
          onChange={ handleInputChange } 
        />
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
