const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    username: "",
    email: "",
    password: "",
    code: "",
    step: 0,
    finished: false,
}

export const regSlice = createSlice({
    name: "reg",
    initialState,
    reducers: {
        regUser: (state, action) => {
            console.log(state, action);
            // const { username } = action.payload
            // state.username = username
            // state.session = true
        },
        nextPage: (state, action) => {
            state.step += 1
        },
        changePage: (state, action) => {
            state.step += (action.payload || 1)
        },
        updateStep1: (state, action) => {
            state.username = action.payload.username
        },
        updateStep2: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
        },
        updateStep3: (state, action) => {
            state.code = action.payload.code
        },
        updateStep4: (state, action) => {
            state.finished = true
        },
        reset: (state, action) => {
            state.username = ''
            state.email = ''
            state.password = ''
            state.code = ''
            state.step = 0
            state.finished = false
        }
    }
})

export const { regUser, nextPage, changePage, updateStep1, updateStep2, updateStep3, updateStep4, reset } = regSlice.actions
export default regSlice.reducer