import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page, { rejectWithValue }) => {
      try {
        const data = await UserService.getUsers(page);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  
  export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id, { rejectWithValue }) => {
      try {
        const data = await UserService.getUserById(id);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  
  export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, { rejectWithValue }) => {
      try {
        const data = await UserService.deleteUser(id);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );
  
  export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user, { rejectWithValue }) => {
      try {
        const data = await UserService.updateUser(user);
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    },
  );