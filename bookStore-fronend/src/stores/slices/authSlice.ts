import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  token: string | null;
  userName: string | null;
}
const auth: Auth = {
  token: null,
  userName: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userName } = action.payload;
      console.log("payload", action.payload);

      if (token) {
        state.token = token;
        state.userName = userName;
      }
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
