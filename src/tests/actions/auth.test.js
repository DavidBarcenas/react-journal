import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPwd, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth: {
    uid: '12345adf',
    displayName: 'Davee'
  },
}
let store = mockStore( initState )

describe('<auth-actions /> testing', () => {

  beforeEach(() => {
    store = mockStore( initState )
  })
  
  test('You should create the action: login and logout', async() => {
    const loginAction = login(initState.auth.uid, initState.auth.displayName)
    const logoutAction = logout()

    expect(loginAction).toEqual({
      type: types.login,
      payload: initState.auth
    })

    expect(logoutAction).toEqual({
      type: types.logout
    })
  })

  test('should startLogout', async () => {
    await store.dispatch( startLogout() )
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.logout
    })
    
    expect(actions[1]).toEqual({
      type: types.noteLogoutCleaning
    })
  })
  
  test('should init startLoging', async () => {
    await store.dispatch( startLoginEmailPwd('max@mail.com', 'helloworld12') )
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.uiStartLoading
    })
  })
  
})
