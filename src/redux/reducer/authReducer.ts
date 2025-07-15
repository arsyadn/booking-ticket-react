const initialState = {
  loginData: [],
};

interface AuthState {
  loginData: any[];
}

interface AuthAction {
  type: string;
  payload?: any;
}

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loginData: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
