import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const deleteWorkout = (workoutRef) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, "workouts", workoutRef));
      resolve("Workout deleted");
    } catch (error) {
      reject(err);
    }
  });
};
