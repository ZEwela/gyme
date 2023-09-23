import { ref, set, push, serverTimestamp } from "firebase/database";
import { db } from "../../firebase";

export async function create(name, exercisesList) {
  const timestamp = serverTimestamp();
  const workoutData = {
    workout_name: name.toLowerCase(),
    exercisesList: exercisesList,
    timestamp: timestamp,
  };

  const newWorkoutRef = await push(ref(db, "workouts"));

  await set(newWorkoutRef, workoutData)
    .then(() => {
      alert("Workout saved");
    })
    .catch((error) => {
      alert(
        "Sorry something went wrong while creating workout, please try again later"
      );
    });
}
