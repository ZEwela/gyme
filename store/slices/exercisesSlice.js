import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
    exercise: null,
  },
  reducers: {
    setExercises(state, action) {
      state.exercises = action.payload;
    },
    getExercise(state, action) {
      const exercise = state.exercises.find(
        ({ exercise_name }) => exercise_name === action.payload
      );
      if (exercise) {
        state.exercise = exercise;
      }
    },
  },
});

export const selectExercises = (state) => state.exercises.exercises;
export const selectExercise = (state) => state.exercises.exercise;
export const selectExerciseByExerciseName = createSelector(
  [selectExercises],
  (exercises) => (exerciseName) => {
    return exercises
      ? exercises.find(({ exercise_name }) => exercise_name === exerciseName)
      : null;
  }
);
export const { setExercises, getExercise } = exercisesSlice.actions;
export default exercisesSlice.reducer;
