import "./App.css";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/layout/routing/PrivateRoute";
import RRegister from "./components/layout/auth/RRegister";
import URegister from "./components/layout/auth/URegister";
import RLogin from "./components/layout/auth/RLogin";
import ULogin from "./components/layout/auth/ULogin";
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadRestaurantUser } from "./actions/restaurantauth";
// import { loadUser } from "./actions/userauth";
import setAuthToken from "./utils/setAuthToken";
import RestaurantProfile from "./components/layout/restaurant/RestaurantProfile";
import Navbar from "./components/layout/Navbar";
import EditProfile from "./components/layout/restaurant/EditProfile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadRestaurantUser());
    // store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route
                exact
                path="/restaurant/register"
                component={RRegister}
              ></Route>
              <Route exact path="/user/register" component={URegister}></Route>
              <Route exact path="/user/login" component={ULogin}></Route>
              <Route exact path="/restaurant/login" component={RLogin}></Route>

              <PrivateRoute
                exact
                path="/restaurant/profile"
                component={RestaurantProfile}
                role="restaurant"
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/restaurant/edit-profile"
                component={EditProfile}
                role="restaurant"
              ></PrivateRoute>
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
