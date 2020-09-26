import '@testing-library/jest-dom';
import React from 'react'
import configureStore from 'redux-mock-store'
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';

const note = {
  id: 10,
  date: 0,
  title: 'Hello',
  body: 'World',
  url: 'https://test/image.png'
}

const mockStore = configureStore()
let store = mockStore({})
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={ store }>
      <JournalEntry { ...note } />
  </Provider>
)
describe('<JurnalEntry /> testing', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('should trigger note action', () => {
    wrapper.find('.journal__entry').prop('onClick')()
    expect( store.dispatch ).toHaveBeenCalledWith(
      activeNote( note.id, { ...note } )
    )
  })
  
})
