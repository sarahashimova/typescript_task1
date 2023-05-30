import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/User";

interface UserState {
    users: IUser[];
    loading: boolean;
    error: any | null;
}

const initialState: UserState = {
    users: [],
    loading: true,
    error: null
}


//middleware
export const getUsers = createAsyncThunk<IUser[]>(
    "user/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
        console.log(response)

        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
const userSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
            state.users = []
            state.error = null
        });
        builder.addCase(getUsers.rejected, (state, { payload }) => {
            state.loading = false
            state.users = []
            state.error = payload;
        });
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.users = payload;
            state.loading = false
            state.error = null
        });
    }
})


export default userSlice.reducer;