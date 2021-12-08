const gql = require("graphql-tag");
const typeDefs = gql`
  type User {
    name: String!
    email: String!
    password: String
    id: ID!
    token: String
    picture: String
  }

  type Restaurant {
    name: String
    email: String
    location: String
    password: String
    token: String
    id: ID
  }

  type Order {
    tip: Float
    uid: String
    restaurantid: String
    date: String
    total: Int
    order_type: String
    type: String
    delivery_status: String
    pickup_status: String
    delivery_address: String
    notes: String
  }

  type Dish {
    name: String
    ingredients: String
    price: Int
    description: String
    category: String
    updated_by: String
    type: String
    images: String
    restaurant_idx: String
  }

  type UserProfile {
    name: String
    street: String
    city: String
    state: String
    country: String
    nickname: String
    about: String
    dob: String
    email: String
    ph_no: String
  }

  type Query {
    getUser(userid: String): User
    getRestaurant(email: String): Restaurant
    getUserProfile(userid: String): UserProfile
  }

  input DishInput {
    name: String
    ingredients: String
    price: Int
    description: String
    category: String
    updated_by: String
    type: String
    images: String
    restaurant_idx: String
  }

  input ProfileInput {
    name: String
    street: String
    city: String
    state: String
    country: String
    nickname: String
    about: String
    dob: String
    email: String
    ph_no: String
  }

  input UserInput {
    email: String!
    password: String!
    name: String!
  }
  input RestaurantInput {
    email: String!
    password: String!
    name: String!
    location: String!
  }

  input RestLoginInput {
    email: String!
    password: String!
  }

  input OrderInput {
    tip: Int
    restaurant_id_order: String
    total: Int
    delivery_address: String
    type: String
    notes: String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input OrderStatusInput {
    orderid: String!
    del_status: String!
  }
  type Mutation {
    createUser(userInput: UserInput): User!
    login(loginInput: LoginInput): User!
    loginRestaurant(loginInput: LoginInput): Restaurant!
    createRestaurant(restaurantInput: RestaurantInput): Restaurant!
    addDish(dishInput: DishInput): Dish!
    updateProfile(profileInput: ProfileInput): UserProfile!
    createOrder(orderInput: OrderInput): Order!
    updateOrder(orderStatusInput: OrderStatusInput): Order!
  }
`;
module.exports = typeDefs;
