import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_PICTURE_BEGIN,
  FETCH_PROFILE_PICTURE_SUCCESS,
  FETCH_PROFILE_PICTURE_FAILURE,
  FETCH_WOOFS_BEGIN,
  FETCH_WOOFS_SUCCESS,
  FETCH_WOOFS_FAILURE,
  FETCH_SEARCH_BEGIN,
  FETCH_SEARCH_FAILURE, FETCH_SEARCH_SUCCESS,
} from './actions';

const initialState = {
  profile: {
    handle: '',
    email: '',
  },
  searchResults: [],
  userWoofs: [],
  pictureB64: '',
  loading: false,
  token: '',
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          handle: action.payload.profile.handle,
          email: action.payload.profile.email,
          pictureB64: action.payload.profile.pictureB64,
        },
        loading: false,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case FETCH_PROFILE_PICTURE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        pictureB64: action.payload.pictureB64,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case FETCH_WOOFS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WOOFS_SUCCESS:
      return {
        ...state,
        loading: false,
        userWoofs: action.payload.woofArray,
        error: null,
      };
    case FETCH_WOOFS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case FETCH_SEARCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.searchResults,
      };
    case FETCH_SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default rootReducer;
