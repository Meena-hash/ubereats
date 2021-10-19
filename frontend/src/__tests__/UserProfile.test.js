import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Checkout from "../components/layout/user/Checkout";
const initialState = {
  auth: {
    user: {
      token: "",
      isAuthenticated: null,
      loading: true,
      user: null,
      urole: "",
    },
  },
};

const store1 = createStore(rootReducer, initialState);
const Wrapper = ({ children }) => (
  <Provider store={store1}>{children}</Provider>
);

describe("User Profile setup", () => {
  it("Render and test", async () => {
    render(
      <Router>
        <Checkout />
      </Router>,
      { wrapper: Wrapper }
    );
    console.error = (err) => {
      throw new Error(err);
    };
    console.warn = (warning) => {
      throw new Error(warning);
    };
    expect(screen.getByText("Add Promo Code")).toBeInTheDocument();
  });
});
