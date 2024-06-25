// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
interface UserState {
    username: string;
    email: string;
    isLoggedIn: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    username: '',
    email: '',
    isLoggedIn: false,
    status: 'idle',
    error: null,
    token: null,
};

// Thunk for logging in the user
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3003/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.text();
            return rejectWithValue(error);
        }

        const data = await response.json();
        return data;
    } catch (error:any) {
        return rejectWithValue(error.message);
    }
});
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.username = '';
            state.email = '';
            state.isLoggedIn = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: { username: string; email: string } }>) => {
                state.username = action.payload.user.username;
                state.email = action.payload.user.email;
                state.isLoggedIn = true;
                state.status = 'succeeded';
                state.error = null;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            
           ;
    },

});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
