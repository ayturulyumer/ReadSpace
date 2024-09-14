export default function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET_WISHLIST_STATUS":
      return { ...state, wishlistStatus: action.payload, loading: false };
    case "TOGGLE_WISHLIST_ITEM":
      return {
        ...state,
        wishlistStatus: {
          ...state.wishlistStatus,
          [action.payload.bookId]: action.payload.status,
        },
      };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
