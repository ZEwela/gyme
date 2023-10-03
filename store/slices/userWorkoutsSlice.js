import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userWorkoutsSlice = createSlice({
  name: "userWorkouts",
  initialState: {
    userWorkouts: null,
    userWorkout: null,
  },
  reducers: {
    setUserWorkouts(state, action) {
      state.userWorkouts = action.payload;
    },
    resetUserWorkouts(state) {
      state.userWorkouts = null;
    },
    addUserWorkoutToWorkouts(state, action) {
      state.userWorkouts = [action.payload, ...(state.userWorkouts || [])];
    },
    setUserWorkout(state, action) {
      state.userWorkout = action.payload;
    },
    resetUserWorkout(state) {
      state.userWorkout = null;
    },
    setUserWorkoutById(state, action) {
      const foundWorkout = state.userWorkouts?.find(
        (workout) => workout.workout_id === action.payload
      );
      state.userWorkout = foundWorkout || null;
    },
    setUserWorkoutNote(state, action) {
      state.userWorkout = {
        ...state.userWorkout,
        note: action.payload,
      };
    },
    setUserWorkoutSetsByExerciseId(state, action) {
      const { exerciseId, updatedSets } = action.payload;
      const updatedSetsObject = { ...(state.userWorkout?.sets || {}) };
      updatedSetsObject[exerciseId] = updatedSets;
      state.userWorkout = {
        ...state.userWorkout,
        sets: updatedSetsObject,
      };
    },
    addExerciseToUserWorkout(state, action) {
      state.userWorkout = {
        ...state.userWorkout,
        exercises_list: [
          ...(state.userWorkout?.exercises_list || []),
          action.payload,
        ],
      };
    },
  },
});

export const selectUserWorkouts = (state) => state.userWorkouts.userWorkouts;
export const selectWorkoutExercisesList = (state) =>
  state.userWorkouts.userWorkout?.exercises_list;
export const selectWorkout = (state) => state.userWorkouts.userWorkout;
export const selectSetsByExerciseId = createSelector(
  [selectWorkout],
  (userWorkout) => (exerciseId) => {
    return userWorkout.sets ? userWorkout.sets[exerciseId] : null;
  }
);

export const {
  setUserWorkouts,
  resetUserWorkouts,
  setUserWorkoutById,
  setUserWorkoutSetsByExerciseId,
  setUserWorkout,
  resetUserWorkout,
  addUserWorkoutToWorkouts,
  addExerciseToUserWorkout,
  setUserWorkoutNote,
} = userWorkoutsSlice.actions;
export default userWorkoutsSlice.reducer;
