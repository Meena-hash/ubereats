/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import restaurantprofile from "./restaurantprofile";
import userprofile from "./userprofile";
import dashboard from "./dashboard";
import restaurantlanding from "./restaurantlanding";
const rootReducer = combineReducers({
  alert,
  auth,
  restaurantprofile,
  userprofile,
  dashboard,
  restaurantlanding,
});
export default (state, action) =>
  rootReducer(action.type === "LOGOUT_SUCCESS" ? undefined : state, action);
