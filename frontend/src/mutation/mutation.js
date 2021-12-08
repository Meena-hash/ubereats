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

const updateUserProfile = gql`
  mutation updateProfile(
    $name: String!
    $street: String!
    $city: String!
    $state: String!
    $country: String!
    $nickname: String!
    $about: String!
    $dob: String!
    $email: String!
    $ph_no: String!
  ) {
    updateProfile(
      profile: {
        name: $name
        street: $street
        city: $city
        state: $state
        country: $country
        nickname: $nickname
        about: $about
        dob: $dob
        email: $email
        ph_no: $ph_no
      }
    ) {
      name
      street
      city
      state
      country
      nickname
      about
      dob
      email
      ph_no
    }
  }
`;

const addDish = gql`
  mutation addDish(
    $name: String!
    $ingredients: String!
    $price: Int!
    $description: String!
    $category: String!
    $updated_by: String!
    $type: String!
    $images: String!
    $restaurant_idx: String!
  ) {
    addDish(
      dishInput: {
        name: $name
        ingredients: $ingredients
        price: $price
        description: $description
        category: $category
        updated_by: $updated_by
        type: $type
        images: $images
        restaurant_idx: $restaurant_idx
      }
    ) {
      name
      ingredients
      price
      description
      category
      updated_by
      type
      images
      restaurant_idx
    }
  }
`;
const updateOrder = gql`
  mutation updateOrder($orderid: String!, $del_status: String!) {
    updateOrder(
      orderStatusInput: { orderid: $orderid, del_status: $del_status }
    ) {
      tip
      uid
      restaurantid
      date
      total
      order_type
      type
      delivery_status
      pickup_status
      delivery_address
      notes
    }
  }
`;
export {
  addRestaurantMutation,
  addUserMutation,
  loginUser,
  loginRestaurant,
  updateUserProfile,
  addDish,
  updateOrder,
};
