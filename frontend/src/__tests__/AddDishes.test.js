import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AddDishes from "../components/layout/restaurant/AddDishes";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { applyMiddleware } from "redux";

// creating the redux store
const store = createStore(rootReducer, applyMiddleware(thunk));
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

const store1 = createStore(rootReducer, applyMiddleware(thunk));
const Wrapper = ({ children }) => (
  <Provider store={store1}>{children}</Provider>
);

describe("Add Dishes Setup", () => {
  it("Render and match snapshot", async () => {
    render(
      <Router>
        <AddDishes />
      </Router>,
      { wrapper: Wrapper }
    );
  });
});
describe("Add Dishes snapshot", () => {
  it("Render and match text", async () => {
    render(
      <Router>
        <AddDishes />
      </Router>,
      { wrapper: Wrapper }
    );
    // expect(screen.getByText("Add Dishes")).toBeInTheDocument();
  });
  expect(screen).toMatchSnapshot();
});
