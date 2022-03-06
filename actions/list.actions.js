export const UPDATE_LIST = 'UPDATE_LIST';
export const updateList = alcohol => {
  return dispatch => { return dispatch({
      type: UPDATE_LIST,
      payload: alcohol
  }) }
}