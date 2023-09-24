import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export function getWorkouts() {
  return new Promise(async (resolve, reject) => {
    try {
      const workoutsCollection = collection(db, "workouts");
      const querySnapshot = await getDocs(workoutsCollection);
      const workouts = [];

      querySnapshot.forEach((doc) => {
        const workoutData = doc.data();
        workouts.push(workoutData);
      });
      resolve(workouts);
    } catch (error) {
      reject(error);
    }
  });
}
