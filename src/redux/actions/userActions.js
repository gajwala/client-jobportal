// src/redux/actions/userActions.js

import axiosInstance from "../../utils/axiosInstance";
import { LOGOUT, UPDATE_PROFILE } from "../constant";

// Action to handle logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const updateProfile = (profileData, userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, profileData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Failed to update profile", error);
  }
};

export const fetchUserProfile = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    const { token, user } = response.data;
    dispatch({
      type: UPDATE_PROFILE,
      payload: { token, user },
    });
  } catch (error) {
    console.error("Failed to fetch user profile", error);
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    const { token, user } = response.data;

    // Save token and user in local storage
    localStorage.setItem("token", token);

    dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/users/register", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed failed");
  }
};
