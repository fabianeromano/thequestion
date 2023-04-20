const { createSlice } = require("@reduxjs/toolkit");

const initialState =
{
    id: "",
    username: "",
    email: "",
    profileImg: "",
    token: "",
    session: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAuth: (state, action) => {
            const { id, username, profileImg, token } = action.payload
            state.id = id
            state.username = username
            state.profileImg = profileImg
            state.token = token
            state.session = true
        },
        logoutAuth: (state) => {
      console.log('clearing data')
            state.id = ""
            state.username = ""
            state.profileImg = ""
            state.token = ""
            state.session = false
        }
    }
})

export const { loginAuth, logoutAuth } = authSlice.actions
export default authSlice.reducer
