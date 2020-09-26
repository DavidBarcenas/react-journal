import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: {
      id: 1234,
      title: 'Hello',
      body: 'World',
      date: 0
    }
  }
}

let store = mockStore( initState )
store.dispatch = jest.fn()


const wrapper = mount(
  <Provider store={ store }>
    <NoteScreen />
  </Provider>
)

describe('<NotesScreen /> testing', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('should trigger activeNote action', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        value: 'My name is Daveepro',
        name: 'title'
      }
    })
    expect(activeNote).toHaveBeenLastCalledWith(
      1234,
      {
        body: 'World',
        title: 'My name is Daveepro',
        id: 1234,
        date: 0
      }
    )
  })
  
})
