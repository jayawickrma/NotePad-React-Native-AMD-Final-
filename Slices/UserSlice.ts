import {UserModel} from "@/Model/UserModel";
import {api} from "@/Services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
    user: UserModel | null;
    jwt_token: string | null;
    refresh_token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string;
} = {
    user: null,
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: "",
};

// Type for UserRootState (to type-check the global state)
export type UserRootState = {
    user: {
        user: UserModel | null;
        jwt_token: string | null;
        refresh_token: string | null;
        username: string | null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
    };
};

// Thunks to handle async actions
export const register = createAsyncThunk(
    "auth/signUp",
    async (user: UserModel) => {
        try {
            const response = await api.post("auth/signUp", user, { withCredentials: true });
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const login = createAsyncThunk(
    "auth/signIn",
    async (user: UserModel) => {
        try {
            const response = await api.post("auth/signIn", user, { withCredentials: true });
            console.log(response.data)
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("refresh_token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Handling the successful registration case
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                    state.error = "";
                    localStorage.setItem("jwt_token", action.payload.accessToken);
                    localStorage.setItem("refresh_token", action.payload.refreshToken);
                }
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = "Registration failed. Please try again.";
                console.error(action.error.message);
            })

            // Handling the successful login case
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.jwt_token = action.payload.accessToken;
                    state.refresh_token = action.payload.refreshToken;
                    state.username = action.payload.username;
                    state.isAuthenticated = true;
                    state.error = "";

                    // Store JWT tokens in localStorage
                    localStorage.setItem("jwt_token", action.payload.accessToken);
                    localStorage.setItem("refresh_token", action.payload.refreshToken);
                }
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = "Login failed. Please check your credentials.";
                console.error(action.error.message);
            });
    },
});

// Exporting logout action
export const { logout } = userSlice.actions;

// Default export of the slice reducer
export default userSlice.reducer;
