import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import { createStore } from "redux";
import ULogin from "../components/layout/auth/ULogin";
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

const password = "test";
const username = "test@gmail.com";
describe("User Login", () => {
  it("fires an on change event for email field", async () => {
    render(
      <Router>
        <ULogin />
      </Router>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.queryByText("JavaScript")).toBeNull();
    fireEvent.change(screen.queryByPlaceholderText("Email Address"), {
      target: { value: "JavaScript" },
    });

    expect(screen.getByDisplayValue("JavaScript")).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});

const onSubmitMock = jest.fn((e) => e.preventDefault());

describe("Favourites Login", () => {
  it("Checks if there are fav elements in store", async () => {
    const { container } = render(
      <Router>
        <ULogin onSubmit={onSubmitMock} />
      </Router>,
      { wrapper: Wrapper }
    );
    fireEvent.change(screen.queryByPlaceholderText("Email Address"), {
      target: { value: username },
    });

    fireEvent.change(screen.queryByPlaceholderText("Password"), {
      target: { value: password },
    });
    console.log(container.firstChild);
    fireEvent.click(container.firstChild);
    // expect(onSubmitMock).toHaveBeenCalled();
    // await ()=> expect(onSubmitMock).toHaveBeenCalled();
  });

  // fireEvent.click(screen.getByRole("button"));
  // expect(onSubmitMock).toHaveBeenCalled();
  // expect(onSubmitMock).toHaveBeenCalledWith(
  //   { username, password },
  //   expect.any(Function),
  //   expect.any(Object)
  // );
});
