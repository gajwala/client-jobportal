import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import userReducer from "./userReducer";
import jobsReducer from "./jobsReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  jobs: jobsReducer,
});

export default rootReducer;
