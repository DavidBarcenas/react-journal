import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-provider';
import { types } from '../../types/types';
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
  auth: {
    uid: 'uTesiing'
  }
})

describe('<notes-actions /> testing', () => {

  test('should create a new note', async() => {
    await store.dispatch( startNewNote() )
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.noteActive,
      payload:  {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })
    
    expect(actions[0]).toEqual({
      type: types.noteAddNew,
      payload:  {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })
    
    // delete record firebase
    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete()
  })
  
})
