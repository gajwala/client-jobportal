// src/redux/actions/userActions.js

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// Action to handle login success
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// Action to handle logout
export const logout = () => ({
  type: LOGOUT,
});

// Action to update user profile
export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  payload: profile,
});
