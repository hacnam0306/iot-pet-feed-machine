import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  device: null,
};

const counterSlice = createSlice({
  name: 'counter', // Name of the slice (used for action types)
  initialState,
  reducers: {
    update(state, payload) {
      state.device = payload.payload; // Update state immutably
    },
  },
});
export const {update} = counterSlice.actions;
export default counterSlice.reducer;
