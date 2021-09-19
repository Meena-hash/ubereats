import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import restaurantprofile from "./restaurantprofile";
export default combineReducers({
  alert,
  auth,
  restaurantprofile,
});
