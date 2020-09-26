import '@testing-library/jest-dom';
import React from 'react'
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  ui: {
    loading: false,
    msgError: null
  }
}
let store = mockStore( initState )

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('<RegisterScreen /> testing', () => {
  
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('should trigger the action', () => {
    const emailField = wrapper.find('input[name="email"]')
    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    })
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })
    const actions = store.getActions()
    expect(actions[0]).toEqual({ 
      type: types.uiSetError,
      payload: 'Email is not valid' 
    })
  })

  test('should show the alert box with the error', () => {
    const initState = {
      ui: {
        loading: false,
        msgError: 'Email is not valid'
      }
    }
    const store = mockStore( initState )
    
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy()
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
  })
  
})
