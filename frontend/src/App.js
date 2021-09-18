import "./App.css";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RRegister from "./components/layout/auth/RRegister";
import URegister from "./components/layout/auth/URegister";
import RLogin from "./components/layout/auth/RLogin";
import ULogin from "./components/layout/auth/ULogin";
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadRestaurantUser } from "./actions/restaurantauth";
import { loadUser } from "./actions/userauth";
import setAuthToken from "./utils/setAuthToken";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadRestaurantUser());
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Footer />
          <section className="container">
            <Alert />
            <Switch>
              <Route
                exact
                path="/restaurant/register"
                component={RRegister}
              ></Route>
              <Route exact path="/user/register" component={URegister}></Route>
              <Route exact path="/restaurant/login" component={RLogin}></Route>
              <Route exact path="/user/login" component={ULogin}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
