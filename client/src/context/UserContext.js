import { createContext, useReducer, useEffect  } from "react";
import { initialState, UserReducer } from "../reducer/UserReducer";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";

const UserContext = createContext();

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const history = useHistory();
  useEffect(() => {
    async function fetchUser() {
      try {
        let accessToken = localStorage.getItem("auth-token");
        if (accessToken) {
          const { data } = await axios.get("/api/user/fetch");
          dispatch({ type: "FETCH_USER", payload: data.user });
          // history.push("/");
        }
        
      } catch (err) {
        dispatch({ type: "USER_ERROR", payload: err.response?.data });
        history.push("/login")
      }
    }
    // let accessToken = localStorage.getItem("auth-token");
    // if(!state.authenticated || !accessToken){
    //   history.push("/login")
    // }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };