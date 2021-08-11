import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { images } from "./images.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  images,
  users,
  alert,
});

export default rootReducer;
