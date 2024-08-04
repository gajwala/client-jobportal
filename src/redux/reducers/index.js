import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: userReducer,
});

export default rootReducer;
