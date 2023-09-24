import { configureStore } from "@reduxjs/toolkit";

import exercisesReducer from "./slices/exercisesSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    user: userReducer,
  },
});

export default store;
