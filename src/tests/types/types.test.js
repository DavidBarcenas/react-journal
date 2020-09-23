import { types } from "../../types/types"

describe('<types /> testing', () => {
  
  const objTypes = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',
    uiSetError: '[UI] Set error',
    uiRemoveError: '[UI] Remove error',
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',
    noteAddNew: '[Notes] New note',
    noteActive: '[Notes] Set active note',
    noteLoad: '[Notes] Load notes',
    noteUpdated: '[Notes] Updated note',
    noteFileUrl: '[Notes] Updated image url',
    noteDelete: '[Notes] Delete note',
    noteLogoutCleaning: '[Notes] Logout Cleaning',
  }
  
  test('should match the objects of types', () => {
    expect(types).toEqual(objTypes)
  })
})
