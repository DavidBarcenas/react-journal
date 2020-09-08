import { db } from "../firebase/firebase-provider"

export const loadNotes = async ( uid ) => {
  const notesSnap = await db.collection(`${ uid }/journal/notes`).get()
  let notes = []

  notesSnap.forEach( doc => {
    notes = [...notes, {
      id: doc.id,
      ...doc.data()
    }]
  })

  return notes;
}