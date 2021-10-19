import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Favourites from "../components/layout/user/Favourites";
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

describe("Favourites Setup", () => {
  it("Render and match snapshot", async () => {
    render(
      <Router>
        <Favourites />
      </Router>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText("Not allowed to access")).toBeInTheDocument();
  });
});
describe("Favourites snapshot", () => {
  it("Render and match text", async () => {
    render(
      <Router>
        <Favourites />
      </Router>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText("Not allowed to access")).toBeInTheDocument();
  });
  expect(screen).toMatchSnapshot();
});
