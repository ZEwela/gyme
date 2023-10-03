import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const updateWorkout = (workout) => {
  return new Promise(async (resolve, reject) => {
    try {
      const workoutRef = doc(db, "workouts", workout.workout_id);
      await updateDoc(workoutRef, {
        updated_at: serverTimestamp(),
        sets: workout.sets,
        note: workout.note,
        exercises_list: workout.exercises_list,
      });
      resolve("Workout updated");
    } catch (error) {
      reject(err);
    }
  });
};
