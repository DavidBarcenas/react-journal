import '@testing-library/jest-dom';
import React from 'react'
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-provider';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: []
  }
}
let store = mockStore( initState )
store.dispatch = jest.fn()

describe('<AppRouter /> testing', () => {
  
  test('should send to login if authenticated', async () => {

    let user;

    await act( async () => {

      const userCred = await firebase.auth().signInWithEmailAndPassword('max@mail.com', 'helloworld12')
      user = userCred.user;

      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      )
    })

    expect( login ).toHaveBeenCalled()
  })
  

})
