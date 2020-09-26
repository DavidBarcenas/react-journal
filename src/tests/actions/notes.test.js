import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-provider';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hello-worl/photo.jpg'
  })
}))
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: 'uTesiing'
  },
  notes: {
    active: {
      id: 'asdasd6as5d487ads',
      title: 'hello world',
      body: 'How are you?'
    }
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


  test('should upload an image', async () => {
    const file = new File([], 'photo.jpg')
    await store.dispatch( startUploading(file) )

    const docRef = await db.doc(`/TESTING/journal/notes/${initState.notes.active.id}`).get()
    expect(docRef.data().url).toBe('https://hello-worl/photo.jpg')
  })
  
})
