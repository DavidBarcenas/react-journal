import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes'

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}))

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth: {
    uid: 'd236d',
    name: 'Davee'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: null
  }
}
let store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
<Provider store={store}>
  <Sidebar />
</Provider>
)

describe('<Sidebar /> testing', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should trigger startLogout action', () => {
    wrapper.find('.btn').prop('onClick')()
    expect(startLogout).toHaveBeenCalled()
  })
  
  test('should trigger startNewNote action', () => {
    wrapper.find('.journal__new-entry').prop('onClick')()
    expect(startNewNote).toHaveBeenCalled()
  })
  
})
