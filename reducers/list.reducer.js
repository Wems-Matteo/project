import { UPDATE_LIST } from '../actions/list.actions';
const initialState = {alcohol: 'Vodka'}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST: return [action.payload];
    default: return state;
  }
}