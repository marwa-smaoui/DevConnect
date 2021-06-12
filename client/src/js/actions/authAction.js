import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LODED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
  } from "../const/actionTypes";
  import axios from "axios";
  import { setAlert } from "./alertAction";
  import setAuthToken from "../utils/setAuthToken";
  
  //LOAD USER
  export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LODED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  
  //Register User
  export const register =
    ({ name, lastName, email, password }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify({ name, lastName, email, password });
  
      try {
        const res = await axios.post("/api/contacts", body, config);
        localStorage.setItem("token",res.data.token)
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
          });
        }
        dispatch({
          type: REGISTER_FAIL,
        });
      }
    };
  
  //LOGIN  User
  export const login =
    ({ email, password }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify({ email, password });
  
      try {
        const res = await axios.post("/api/auth", body, config);
        localStorage.setItem("token",res.data.token)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
          });
        }
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    };
  
  //LOGOUT/ Clear profile
  
  export const logout = () => (dispatch) => {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: LOGOUT,
    });
   
  };
  