import axiosInstance from "../../utils/axiosInstance";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    const { token, user } = response.data;

    // Save token and user in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
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
