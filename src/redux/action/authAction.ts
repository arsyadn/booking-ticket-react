import axios from "axios";
import { Dispatch } from "redux";

export interface RegisterResponse {
  token: string;
  error: boolean;
  config: any;
  data: {
    error?: string;
    token?: string;
  };
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export const registerAction = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    const data = await axios.post<RegisterResponse>("/register", {
      name,
      email,
      password,
    });

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: data,
    });
    return data;
  };
};

export const LoginAction = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const data = await axios.post<RegisterResponse>("/login", {
      email,
      password,
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });
    return data;
  };
};
