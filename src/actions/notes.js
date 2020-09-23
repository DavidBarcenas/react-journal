import { db } from "../firebase/firebase-provider";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

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
    dispatch(addNewNote( doc.id, newNote ))
  }
}

export const activeNote = ( id, note ) => ({
  type: types.noteActive,
  payload: {
    id, 
    ...note
  }
})

export const addNewNote = ( id, note ) => ({
  type: types.noteAddNew,
  payload: { id, ...note }
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

export const startSaveNote = ( note ) => {
  return async ( dispatch, getState ) => {
    const {auth: { uid }} = getState();

    if( !note.url ) { delete note.url }

    const noteToFS = { ...note }
    delete noteToFS.id;

    await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFS)
    dispatch(refreshNote( note.id, noteToFS ))
    Swal.fire('Saved', note.title, 'success')
  }
}

export const refreshNote = ( id, note ) => ({
  type: types.noteUpdated,
  payload: {
    id, note: { id, ...note }
  }
})

export const startUploading = ( file ) => {
  return async ( dispatch, getState ) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Uloading...',
      text: 'Please wait...',
      onBeforeOpen: () => Swal.showLoading()
    })

    const fileUrl = await fileUpload( file )
    activeNote.url = fileUrl;

    dispatch(startSaveNote( activeNote ))
    Swal.close()
  }
}

export const startDeleting = ( id ) => {
  return async ( dispatch, getState ) => {
    const {auth: { uid }} = getState();
    await db.doc(`${ uid }/journal/notes/${ id }`).delete()

    dispatch(deleteNote( id ))
  }
}

export const deleteNote = ( id ) => ({
  type: types.noteDelete,
  payload: id
})