import { UPDATE_MODE } from '../actions/user.actions';
const initialState = {}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MODE: return { mode: action.payload }
    default: return state;
  }
}