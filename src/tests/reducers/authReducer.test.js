import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('<authReducer> testing', () => {
  test('I should do the login', () => {
    const initState = {}
    const action = {
      type: types.login,
      payload: {
        uid:' abc132',
        displayName: 'David'
      }
    }
    const state = authReducer( initState, action )

    expect( state ).toEqual({
      uid:' abc132',
      name: 'David'
    })
  })
  
  test('I should do the logout', () => {
    const initState = {
      uid:' abc132',
      displayName: 'David'
    }
    const action = {
      type: types.logout
    }
    const state = authReducer( initState, action )

    expect( state ).toEqual({})
  })
  
  
  test('I should do the logout', () => {
    const initState = {
      uid:' abc132',
      displayName: 'David'
    }
    const action = {
      type: 'otherType'
    }
    const state = authReducer( initState, action )

    expect( state ).toEqual( initState )
  })
  
})
