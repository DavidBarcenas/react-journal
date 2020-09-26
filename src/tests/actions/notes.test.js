import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-provider';
import { types } from '../../types/types';
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: 'uTesiing'
  }
}

let store = mockStore( initState )

describe('<notes-actions /> testing', () => {

  beforeEach(() => {
    store = mockStore( initState )
  })

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

  test('should load notes', async () => {
    await store.dispatch( startLoadingNotes('journal') )
    const actions = store.getActions()

    expect( actions[0] ).toEqual({
      type: types.noteLoad,
      payload: expect.any(Array)
    })

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }

    expect( actions[0].payload[0] ).toMatchObject( expected )
  })
  
  
  test('should update the note', async () => {
    const note = {
      id: '231asdas65d4as8d7as',
      title: 'title',
      body: testing
    }

    await store.dispatch(startSaveNote( note ))

    const actions = store.getActions()
    expect( actions[0].type ).toBe(types.noteUpdated)
  })
  
})
