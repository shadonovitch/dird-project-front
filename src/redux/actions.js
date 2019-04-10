export const FETCH_PROFILE_BEGIN = 'FETCH_PROFILE_BEGIN';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const FETCH_PROFILE_PICTURE_BEGIN = 'FETCH_PROFILE_PICTURE_BEGIN';
export const FETCH_PROFILE_PICTURE_SUCCESS = 'FETCH_PROFILE_PICTURE_SUCCESS';
export const FETCH_PROFILE_PICTURE_FAILURE = 'FETCH_PROFILE_PICTURE_FAILURE';

export const FETCH_WOOFS_BEGIN = 'FETCH_WOOFS_BEGIN';
export const FETCH_WOOFS_SUCCESS = 'FETCH_WOOFS_SUCCESS';
export const FETCH_WOOFS_FAILURE = 'FETCH_WOOFS_FAILURE';

export const FETCH_SEARCH_BEGIN = 'FETCH_SEARCH_BEGIN';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: { profile },
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: { error },
});

export const fetchProfilePictureBegin = () => ({
  type: FETCH_PROFILE_PICTURE_BEGIN,
});

export const fetchProfilePictureSuccess = pictureB64 => ({
  type: FETCH_PROFILE_PICTURE_SUCCESS,
  payload: { pictureB64 },
});

export const fetchProfilePictureFailure = error => ({
  type: FETCH_PROFILE_PICTURE_FAILURE,
  payload: { error },
});

export const fetchWoofsBegin = () => ({
  type: FETCH_WOOFS_BEGIN,
});

export const fetchWoofsSuccess = woofArray => ({
  type: FETCH_WOOFS_SUCCESS,
  payload: { woofArray },
});

export const fetchWoofsFailure = error => ({
  type: FETCH_WOOFS_FAILURE,
  payload: { error },
});

export const fetchSearchBegin = () => ({
  type: FETCH_SEARCH_BEGIN,
});

export const fetchSearchSuccess = searchResults => ({
  type: FETCH_SEARCH_SUCCESS,
  payload: { searchResults },
});

export const fetchSearchFailure = error => ({
  type: FETCH_SEARCH_FAILURE,
  payload: { error },
});

export function fetchUserWoofs(token) {
  return (dispatch) => {
    dispatch(fetchWoofsBegin());
    fetch('https://dirdapi.chaz.pro/woofs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then((responseJson) => {
        dispatch(fetchWoofsSuccess(responseJson));
      })
      .catch(error => dispatch(fetchWoofsFailure(error)));
  };
}

export function fetchProfile(token) {
  return (dispatch) => {
    dispatch(fetchProfileBegin());
    fetch('https://dirdapi.chaz.pro/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { handle, email } = responseJson;
        const profile = { handle, email };
        dispatch(fetchProfileSuccess(profile));
      }).catch(error => dispatch(fetchProfileFailure(error)));
  };
}

export function fetchProfilePicture(token) {
  return (dispatch) => {
    dispatch(fetchProfilePictureBegin());
    fetch('https://dirdapi.chaz.pro/profile/picture', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { pictureB64 } = responseJson;
        dispatch(fetchProfilePictureSuccess(pictureB64));
      }).catch(error => dispatch(fetchProfilePictureFailure(error)));
  };
}

export function fetchSearch(token, query) {
  return (dispatch) => {
    dispatch(fetchSearchBegin());
    fetch(`https://dirdapi.chaz.pro/users?handle=${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
      .then((responseJson) => {
        dispatch(fetchSearchSuccess(responseJson));
      })
      .catch(error => dispatch(fetchSearchFailure(error)));
  };
}
