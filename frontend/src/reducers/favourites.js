import { ADD_FAVOURITE, GET_CURRENTUSER_FAVOURITES } from "../actions/types";

const initialState = {
  favlist: [],
  loading: true,
};

export default function favourites(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENTUSER_FAVOURITES:
    case ADD_FAVOURITE:
      return {
        ...state,
        favlist: payload,
        loading: false,
      };
    default:
      return state;
  }
}
