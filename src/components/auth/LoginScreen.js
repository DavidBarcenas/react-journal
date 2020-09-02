import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startLoginEmailPwd, startGoogleLogin } from '../../actions/auth'
import isEmail from 'validator/lib/isEmail'
import { setError, removeError } from '../../actions/ui'

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } =  useSelector( state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    email: 'max@mail.com',
    pwd: 'helloworld12'
  });

  const { email, pwd } = formValues;

  const isFormValid = () => {
    if(!isEmail( email ) || pwd.trim().length < 5 ) {
      dispatch( setError('Invalid email or password') )
      return false;
    } 
    dispatch( removeError() )
    return true;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if( isFormValid() ) {
      dispatch( startLoginEmailPwd( email, pwd ) )
    }
  }

  const handleGoogleLogin = () => dispatch( startGoogleLogin() )

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
        <button type="submit" disabled={ loading } className="btn btn-primary btn-block">Sign in</button>
      </form>

      <div>
        <span className="auth__social-text">Login with social networks</span>
        <button className="btn btn-block btn__google" onClick={ handleGoogleLogin }>
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
