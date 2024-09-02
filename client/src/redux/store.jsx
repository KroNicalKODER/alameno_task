import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';

const initialState = {
  student: null, 
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      if (!state.student) {
        state.student = action.payload; 
      } else {
        console.warn('Only one student is allowed.');
      }
    },
    removeStudent: (state) => {
      state.student = null; 
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;

const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
});

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
