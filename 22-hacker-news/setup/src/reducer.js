import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      let newHits = state.hits.filter(
        (hit) => hit.objectID !== action.payload.id
      );
      return {
        ...state,
        hits: newHits,
      };
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    case HANDLE_PAGE:
      const value = action.payload;
      if (value === "inc") {
        let newPage = state.page + 1;
        if (newPage > state.nbPages - 1) {
          newPage = 0;
        }
        return {
          ...state,
          page: newPage,
        };
      }
      if (value === "dec") {
        let newPage = state.page - 1;
        if (newPage < 0) {
          newPage = state.nbPages - 1;
        }
        return {
          ...state,
          page: newPage,
        };
      }
    default:
      throw new Error(`no matching "${action.type}" action.`);
  }
};
export default reducer;
