import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const response = await axios.get('https://blackcoffer-alemeno.onrender.com/api/courses');
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch courses');
  }
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.courses = action.payload;
    },
    [fetchCourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectAllCourses = (state) => state.course.courses;
export const selectCoursesStatus = (state) => state.courses;

export default coursesSlice.reducer;
