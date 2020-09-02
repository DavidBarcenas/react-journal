import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { setError, removeError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui)

  /* DELETE INITIFORM FOR PRODUCTION ============== */
  const initialForm = {
    name: 'Max',
    email: 'max@mail.com',
    pwd: 'helloworld12',
    pwdConfirm: 'helloworld12',
  }

  const [ formValues, handleInputChange ] = useForm(initialForm);
  const { name, email, pwd, pwdConfirm } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if( isFormValid() ) {
      dispatch( startRegister( email, pwd, name ) )
    }
  }

  const isFormValid = () => {
    if( name.trim().length === 0 ) {
      dispatch( setError('Name is required') )
      return false;
    } 
    else if( !isEmail( email ) ) {
      dispatch( setError('Email is not valid') )
      return false;
    } 
    else if( pwd !== pwdConfirm || pwd.length < 5 ) {
      dispatch( setError('Password should be at least six characters and match each other') )
      return false;
    }

    dispatch( removeError() )
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      { msgError && <div className="auth__alert-error"> { msgError} </div> }

      <form onSubmit={ handleSubmit }>
        <input type="text" className="auth__input" placeholder="Name" name="name" value={ name } onChange={ handleInputChange } />
        <input type="email" className="auth__input" placeholder="Email" name="email" value={ email } onChange={ handleInputChange } />
        <input type="password" className="auth__input" placeholder="Password" name="pwd" value={ pwd } onChange={ handleInputChange } />
        <input type="password" className="auth__input" placeholder="Password confirm" name="pwdConfirm" value={ pwdConfirm } onChange={ handleInputChange }/>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>

      <Link to="/auth/login" className="auth__social-text"> Already registered?</Link>
    </>
  )
}
