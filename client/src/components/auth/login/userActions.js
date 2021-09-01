import axios from "axios";

export const getUser = (_id) => async (dispatch) => {
  const res = await axios.get(
    "https://astralspace.herokuapp.com/api/auth/loggedIn"
  );
  dispatch({
    type: getUser,
    payload: res.data.data,
  });
};
