import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function create(name, exercisesList) {
  try {
    const newWorkoutRef = doc(collection(db, "workouts"));
    const workoutId = newWorkoutRef._key.path.segments[1];
    const workoutData = {
      id: workoutId,
      workout_name: name.toLowerCase(),
      exercises_list: exercisesList,
    };

    await setDoc(newWorkoutRef, workoutData);

    alert("Workout saved");
  } catch (error) {
    alert(
      "Sorry, something went wrong while creating the workout. Please try again later."
    );
    console.error(error);
  }
}
