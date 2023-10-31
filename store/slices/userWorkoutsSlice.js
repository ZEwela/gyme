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
    removeExerciseFromUserWorkout(state, action) {
      const filteredExercises = state.userWorkout.exercises_list.filter(
        ({ exercise_id }) => exercise_id !== action.payload
      );
      state.userWorkout = {
        ...state.userWorkout,
        exercises_list: [...filteredExercises],
      };
    },
    addMemberToWorkout(state, action) {
      state.userWorkout = {
        ...state.userWorkout,
        workout_members: [
          ...(state.userWorkout?.workout_members || []),
          action.payload,
        ],
      };
    },
    removeMemberFromWorkout(state, action) {
      const filteredmembers = state.userWorkout.workout_members.filter(
        (member) => member !== action.payload
      );
      state.userWorkout = {
        ...state.userWorkout,
        workout_members: [...filteredmembers],
      };
    },
    addMembersSetsByExerciseId(state, action) {
      const { memberId, sets, updatedSets, exerciseId } = action.payload;
      console.log("from workoutsSlice", action.payload);
      state.userWorkout = {
        ...state.userWorkout,
        members_sets: { ...(state.userWorkout.members_sets || {}) },
      };
      const updatedMembersSets = { ...state.userWorkout.members_sets };
      updatedMembersSets[memberId] = {
        ...(state.userWorkout.members_sets[memberId] || {}),
      };

      updatedMembersSets[memberId][exerciseId] = sets || updatedSets;

      state.userWorkout = {
        ...state.userWorkout,
        members_sets: updatedMembersSets,
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
export const selectMembersSets = (state) =>
  state.userWorkouts.userWorkout.members_sets;
export const selectMemberSetsByMemberId = createSelector(
  [selectMembersSets],
  (members_sets) => (memberId) => {
    console.log("from workout slice", members_sets);
    return members_sets[memberId] ? members_sets.sets[memberId] : null;
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
  removeExerciseFromUserWorkout,
  setUserWorkoutNote,
  addMemberToWorkout,
  removeMemberFromWorkout,
  addMembersSetsByExerciseId,
} = userWorkoutsSlice.actions;
export default userWorkoutsSlice.reducer;
