import { configureStore } from "@reduxjs/toolkit";

import exercisesReducer from "./slices/exercisesSlice";
import userReducer from "./slices/userSlice";
import userWorkoutsReducer from "./slices/userWorkoutsSlice";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    user: userReducer,
    userWorkouts: userWorkoutsReducer,
  },
});

export default store;
