import { gql } from "apollo-boost";
const getUserProfile = gql`
  query ($userid: String) {
    getUserProfile(userid: $userid) {
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
const getUser = gql`
  query ($userid: String) {
    getUser(userid: $userid) {
      id
      name
      email
    }
  }
`;
const getRestaurant = gql`
  query ($id: String) {
    getUserProfile(id: $id) {
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

export { getUserProfile, getRestaurant, getUser };
