import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";

export function getWorkouts() {
  return new Promise((resolve, reject) => {
    const workoutsRef = ref(db, "workouts");

    onValue(workoutsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const dataInArray = Object.values(data);
        resolve(dataInArray);
      } catch (error) {
        reject(error);
      }
    });
  });
}
