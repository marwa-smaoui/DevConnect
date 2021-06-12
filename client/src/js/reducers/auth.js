import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LODED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
  } from "../const/actionTypes";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    contact: null,
  };
  const auth = (state = initialState, { type, payload }) => {
    switch (type) {
      case USER_LODED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          contact: payload,
        };
  
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          contact: { ...payload },
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case ACCOUNT_DELETED:
        localStorage.removeItem("token");
        return { ...state, token: null, isAuthenticated: false, loading: false };
  
      default:
        return state;
    }
  };
  
  export default auth;
  