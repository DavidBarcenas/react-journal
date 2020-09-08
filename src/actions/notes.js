import { db } from "../firebase/firebase-provider";

export const startNewNote = () => {
  return async ( dispatch, getState ) => {
    const {auth: { uid }} = getState();
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await db.collection(`${ uid }/journal/notes`).add( newNote )
  }
}