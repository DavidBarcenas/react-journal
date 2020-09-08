import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesrecuer = ( state = initialState, action) => {
  switch ( action.type ) {
    case types.noteActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }
    
    case types.noteLoad:
      return {
        ...state,
        notes: [ ...action.payload ]
      }

    default:
      return state;
  }
}