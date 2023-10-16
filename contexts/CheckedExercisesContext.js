// CheckedExercisesContext.js
import React, { createContext, useContext, useState } from "react";

const CheckedExercisesContext = createContext();

export const CheckedExercisesProvider = ({ children }) => {
  const [checkedExercises, setCheckedExercises] = useState([]);

  return (
    <CheckedExercisesContext.Provider
      value={{ checkedExercises, setCheckedExercises }}
    >
      {children}
    </CheckedExercisesContext.Provider>
  );
};

export const useCheckedExercises = () => {
  return useContext(CheckedExercisesContext);
};
