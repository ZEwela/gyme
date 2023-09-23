import { createSlice } from "@reduxjs/toolkit";

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
  },
  reducers: {
    setExercises(state, action) {
      state.exercises = action.payload;
    },
  },
});

export const selectExercises = (state) => state.exercises.exercises;
export const { setExercises } = exercisesSlice.actions;
export default exercisesSlice.reducer;
