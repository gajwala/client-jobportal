// src/redux/reducers/userReducer.js

import { LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE } from "../constant";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
