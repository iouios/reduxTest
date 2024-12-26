import { createSlice, PayloadAction , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  userName: string;
  title: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk<User[], void>(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data; // คืนค่าผลลัพธ์ที่ได้จาก API
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<Omit<User, 'id'>>) {
      const newUser = {
        id: state.users.length + 1, 
        ...action.payload,
      };
      state.users.push(newUser);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      // ลบผู้ใช้ที่เลือกตาม ID
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    clearUsers: (state) => {
      state.users = []; // ลบข้อมูลทั้งหมด
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      });
  },
});

export const { addUser, removeUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;
