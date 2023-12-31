import { auth, db } from "../../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

export async function create(name, exercisesList) {
  return new Promise(async (resolve, reject) => {
    try {
      const timeStamp = serverTimestamp();
      const user = auth.currentUser;
      const newWorkoutRef = doc(collection(db, "workouts"));

      const workoutId = newWorkoutRef._key.path.segments[1];

      const workoutData = {
        workout_id: workoutId,
        workout_name: name.toLowerCase(),
        exercises_list: exercisesList,
        created_at: timeStamp,
        user_id: user.uid,
      };

      await setDoc(newWorkoutRef, workoutData);
      resolve("Workout saved");

      // alert("Workout saved");
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
}
