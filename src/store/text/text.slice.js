import { createSlice } from '@reduxjs/toolkit';

export const textSlice = createSlice({
  name: 'text',
  initialState: {
    text: '',
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = textSlice.actions;
export default textSlice.reducer;
