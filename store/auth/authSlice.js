import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "./authService";


export const register = createAsyncThunk('auth/register', async(mode, email, password, thunkAPI) => {
    try {
        return await createUser(mode, email, password);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

const initialState = {
    user: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
});

export const authReducer = authSlice.reducer;