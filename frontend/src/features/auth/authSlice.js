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
        }
    }
})

export const { loginAuth } = authSlice.actions
export default authSlice.reducer
