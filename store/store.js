import { configureStore } from "@reduxjs/toolkit";

import exercisesReducer from "./slices/exercisesSlice";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});

export default store;
