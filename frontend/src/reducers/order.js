import { PLACE_ORDER } from "../actions/types";

const initialState = {
  order: {},
  loading: true,
};

export default function Order(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    default:
      return state;
  }
}
