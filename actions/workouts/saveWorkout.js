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
        note: workout.note || null,
      };

      if (workout.sets) {
        for (const key in workout.sets) {
          if (Object.hasOwnProperty.call(workout.sets, key)) {
            const array = workout.sets[key];
            const userSetsByExerciseRef = doc(
              collection(db, "userExercisesSets", key, user.uid)
            );
            const data = {
              created_at: timeStamp,
              sets: array,
            };
            try {
              await setDoc(userSetsByExerciseRef, data);
            } catch (error) {
              console.error(
                "Error during saving workout, adding sets to userExerciseSets: ",
                error
              );
            }
          }
        }
      }
      await setDoc(newWorkoutRef, workoutData);
      resolve("Workout saved");
    } catch (error) {
      reject(error);
      console.error("Error trying to save workout: ", error);
    }
  });
};
