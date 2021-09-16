import { GET_ERRORS, REMOVE_ERROR } from "../actions/actionTypes";

const initialState = {
  error: null,
  isOpen: false,
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, error: action.payload };
    case REMOVE_ERROR:
      return { ...state, error: {} };
    default:
      return state;
  }
}
