import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const memberWorkoutSave = (member, workout) => {
  return new Promise(async (resolve, reject) => {
    try {
      const timeStamp = serverTimestamp();

      const newWorkoutRef = doc(collection(db, "workouts"));

      const workoutId = newWorkoutRef._key.path.segments[1];

      const workoutData = {
        workout_id: workoutId,
        workout_name: workout.workout_name.toLowerCase(),
        exercises_list: workout.exercises_list,
        created_at: timeStamp,
        user_id: member,
        sets: workout.members_sets[member] || null,
        note: workout.note || null,
      };

      if (workout.members_sets && workout.members_sets[member]) {
        for (const key in workout.members_sets[member]) {
          if (Object.hasOwnProperty.call(workout.members_sets[member], key)) {
            const array = workout.members_sets[member][key];
            const userSetsByExerciseRef = doc(
              collection(db, "userExercisesSets", key, member)
            );
            const data = {
              created_at: timeStamp,
              sets: array,
            };
            await setDoc(userSetsByExerciseRef, data);
          }
        }
      }
      await setDoc(newWorkoutRef, workoutData);
      resolve("Member workout saved");
    } catch (error) {
      reject(error);
      console.error("Error trying to save member workout: ", error);
    }
  });
};
