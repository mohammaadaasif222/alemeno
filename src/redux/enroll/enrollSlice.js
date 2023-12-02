import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrrolledCourses: [],
};

export const enrollSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    addToEnrrolled: (state, action) => {
      const item = state.enrrolledCourses.find(
        (item) => item._id === action.payload._id
      );
      if (!item) {
        state.enrrolledCourses.push(action.payload);
      }
    },

    deleteItem: (state, action) => {
      state.enrrolledCourses = state.enrrolledCourses.filter(
        (item) => item._id !== action.payload
      );
    },

    setProgress: (state, action) => {
      const { id, progress } = action.payload;
      const updatedCourses = state.enrrolledCourses.map((course) => {
        if (course._id === id) {
          return { ...course, progress };
        }
        return course;
      });

      state.enrrolledCourses = updatedCourses;
    },
    setComplete: (state, action) => {
    
      const { id } = action.payload;
      state.enrrolledCourses = state.enrrolledCourses.map((course) => {
        if (course._id === id) {
          return { ...course, complete: true }; 
        }
        return course;
      });
    },
    
    resetCart: (state) => {
      state.enrrolledCourses = [];
    }
  },
});

export const {
  addToEnrrolled,
  setComplete,
  deleteItem,
  setProgress,
  resetCart,
} = enrollSlice.actions;

export default enrollSlice.reducer;
