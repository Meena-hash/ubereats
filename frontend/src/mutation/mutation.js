import { gql } from "apollo-boost";

const addRestaurantMutation = gql`
  mutation createRestaurant(
    $name: String!
    $email: String!
    $password: String!
    $location: String!
  ) {
    createRestaurant(
      restaurantInput: {
        name: $name
        email: $email
        password: $password
        location: $location
      }
    ) {
      token
    }
  }
`;

const addUserMutation = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(userInput: { name: $name, email: $email, password: $password }) {
      token
    }
  }
`;

const loginUser = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      token
    }
  }
`;

const loginRestaurant = gql`
  mutation loginRestaurant($email: String!, $password: String!) {
    loginRestaurant(loginInput: { email: $email, password: $password }) {
      token
    }
  }
`;
export { addRestaurantMutation, addUserMutation, loginUser, loginRestaurant };
