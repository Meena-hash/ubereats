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
import AddDishes from "./components/layout/restaurant/AddDishes";
// import { loadRestaurantUser } from "./actions/restaurantauth";
import Dishes from "./components/layout/restaurant/Dishes";
// import { loadUser } from "./actions/userauth";
import setAuthToken from "./utils/setAuthToken";
import RestaurantProfile from "./components/layout/restaurant/RestaurantProfile";
import Navbar from "./components/layout/Navbar";
import EditProfile from "./components/layout/restaurant/EditProfile";
import ViewOrder from "./components/layout/restaurant/ViewOrder";
import Orders from "./components/layout/restaurant/Orders";
import UserProfile from "./components/layout/user/UserProfile";
import EditUserProfile from "./components/layout/user/EditUserProfile";
import Dashboard from "./components/layout/user/Dashboard";
import Restaurant from "./components/layout/user/Restaurant";
import Favourites from "./components/layout/user/Favourites";
import Checkout from "./components/layout/user/Checkout";
import PastOrders from "./components/layout/user/PastOrders";
import LandingPage from "./components/layout/LandingPage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    // store.dispatch(loadRestaurantUser);
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {" "}
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/landing" component={LandingPage}></Route>
            <section className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/restaurant/register"
                  component={RRegister}
                ></Route>
                <PrivateRoute
                  exact
                  path="/user/dashboard"
                  role="user"
                  component={Dashboard}
                ></PrivateRoute>
                <Route
                  exact
                  path="/user/register"
                  component={URegister}
                ></Route>
                <Route exact path="/user/login" component={ULogin}></Route>
                <PrivateRoute
                  exact
                  path="/user/orderhistory"
                  component={PastOrders}
                  role="user"
                ></PrivateRoute>

                <PrivateRoute
                  exact
                  path="/user/checkout"
                  component={Checkout}
                  role="both"
                ></PrivateRoute>
                <Route
                  exact
                  path="/view/restaurant"
                  component={Restaurant}
                ></Route>
                <PrivateRoute
                  exact
                  path="/user/profile"
                  role="both"
                  component={UserProfile}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/user/favourites"
                  component={Favourites}
                  role="user"
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/user/edit/profile"
                  role="user"
                  component={EditUserProfile}
                ></PrivateRoute>

                <Route
                  exact
                  path="/restaurant/login"
                  component={RLogin}
                ></Route>
                <PrivateRoute
                  exact
                  path="/restaurant/view/order"
                  role="restaurant"
                  component={ViewOrder}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/orders"
                  role="restaurant"
                  component={Orders}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/profile"
                  component={RestaurantProfile}
                  role="both"
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/edit-profile"
                  component={EditProfile}
                  role="restaurant"
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/dishes"
                  component={Dishes}
                  role="both"
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/add/dishes"
                  component={AddDishes}
                  role="restaurant"
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/restaurant/edit/dishes"
                  component={EditProfile}
                  role="restaurant"
                ></PrivateRoute>
              </Switch>
            </section>
          </Fragment>
        </Router>
        <Footer />
      </Provider>
    </ApolloProvider>
  );
};
export default App;
