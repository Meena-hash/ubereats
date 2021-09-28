import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import restaurantprofile from "./restaurantprofile";
import userprofile from "./userprofile";
export default combineReducers({
  alert,
  auth,
  restaurantprofile,
  userprofile,
});
