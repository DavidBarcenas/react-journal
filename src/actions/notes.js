import { db } from "../firebase/firebase-provider";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

export const startNewNote = () => {
  return async ( dispatch, getState ) => {
    const {auth: { uid }} = getState();
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await db.collection(`${ uid }/journal/notes`).add( newNote )
    dispatch(activeNote( doc.id, newNote ))
  }
}

export const activeNote = ( id, note ) => ({
  type: types.noteActive,
  payload: {
    id, 
    ...note
  }
})

export const setNotes = ( notes ) => ({
  type: types.noteLoad,
  payload: notes
})

export const startLoadingNotes = ( uid ) => {
  return async ( dispatch ) => {
    const notes = await loadNotes( uid )
    dispatch(setNotes( notes ))
  }
}
