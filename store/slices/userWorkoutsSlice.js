import { createSlice } from "@reduxjs/toolkit";

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
    resetUserWorkouts(state, action) {
      state.userWorkouts = null;
    },
    setUserWorkout(state, action) {
      state.userWorkout = action.payload;
    },
    resetUserWorkout(state, action) {
      state.userWorkout = null;
    },
    setUserWorkoutByName(state, action) {
      if (state.userWorkouts && state.userWorkouts.length) {
        const foundWorkout = state.userWorkouts.find(
          (workout) => workout.workout_name === action.payload
        );
        state.userWorkout = foundWorkout;
      }
      console.log("from userWorkoutSlice, userWorkout", state.userWorkout);
    },
    setUserWorkoutSetsByExerciseId(state, action) {
      const { exerciseId, updatedSets } = action.payload;
      const updatedSetsObject = { ...(state.userWorkout.sets || {}) };
      updatedSetsObject[exerciseId] = updatedSets;
      state.userWorkout = {
        ...state.userWorkout,
        sets: updatedSetsObject,
      };
      console.log("FROM userWorkoutSlice: ", state.userWorkout);
    },
  },
});

export const selectUserWorkouts = (state) => state.userWorkouts.userWorkouts;
export const selectWorkoutExercisesList = (state) =>
  state.userWorkouts.userWorkout?.exercises_list;
export const selectWorkout = (state) => state.userWorkouts.userWorkout;
export const selectSetsByExerciseId = (state, exerciseId) => {
  if (state.userWorkouts.userWorkout && state.userWorkouts.userWorkout.sets) {
    return state.userWorkouts.userWorkout.sets[exerciseId] || [];
  } else {
    return [];
  }
};

export const {
  setUserWorkouts,
  resetUserWorkouts,
  setUserWorkoutByName,
  setUserWorkoutSetsByExerciseId,
  setUserWorkout,
  resetUserWorkout,
} = userWorkoutsSlice.actions;
export default userWorkoutsSlice.reducer;
