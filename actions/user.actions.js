export const UPDATE_MODE = 'UPDATE_MODE';
export const updateMode = bool => {
  return dispatch => { return dispatch({
      type: UPDATE_MODE,
      payload: bool
  }) }
}