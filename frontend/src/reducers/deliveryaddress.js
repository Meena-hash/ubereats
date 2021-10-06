import { ADD_DELIVERY_ADDRESS, GET_DELIVERY_ADDRESSES } from "../actions/types";

const initialState = {
  addresses: [],
  loading: true,
};

export default function deliveryAddress(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DELIVERY_ADDRESSES:
      return {
        ...state,
        addresses: payload,
        loading: false,
      };
    case ADD_DELIVERY_ADDRESS:
      return {
        ...state,
        addresses: { payload, ...state.addresses },
        loading: false,
      };
    default:
      return state;
  }
}
