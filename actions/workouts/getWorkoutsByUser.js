import { auth, db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export function getWorkoutsByUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      const workoutsCollection = query(
        collection(db, "workouts"),
        where("user_id", "==", user.uid),
        orderBy("created_at", "desc")
      );
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
