import '@testing-library/jest-dom';
import React from 'react'
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPwd } from '../../../actions/auth';


jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPwd: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}
let store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
)

describe('<LoginScreen /> testing', () => {

  beforeEach(() => {
    store = mockStore( initState )
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    expect( wrapper ).toMatchSnapshot()
  })
  
  test('should trigger the startGoogleLogin action', () => {
    wrapper.find('.btn__google').prop('onClick')()
    expect( startGoogleLogin ).toHaveBeenCalled()
  })
  
  test('should trigger the startLoginEmailPwd action with params', () => {
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    })
    expect( startLoginEmailPwd ).toHaveBeenCalledWith('max@mail.com', 'helloworld12')
  })
  
})
