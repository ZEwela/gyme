import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const saveWorkout = (workout) => {
  return new Promise(async (resolve, reject) => {
    try {
      const timeStamp = serverTimestamp();
      const user = auth.currentUser;

      const newWorkoutRef = doc(collection(db, "workouts"));

      const workoutId = newWorkoutRef._key.path.segments[1];

      const workoutData = {
        workout_id: workoutId,
        workout_name: workout.workout_name.toLowerCase(),
        exercises_list: workout.exercises_list,
        created_at: timeStamp,
        user_id: user.uid,
        sets: workout.sets || null,
      };

      await setDoc(newWorkoutRef, workoutData);
      resolve("Workout saved");
    } catch (error) {
      reject(error);
      console.error("Error trying to save workout: ", error);
    }
  });
};
