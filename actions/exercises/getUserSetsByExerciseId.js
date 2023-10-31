import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
export const getUserSetsByExerciseId = async (userId, exerciseId) => {
  try {
    const exerciseUserCollection = query(
      collection(db, "userExercisesSets", exerciseId, userId),
      limit(1),
      orderBy("created_at", "desc")
    );

    const querySnapshot = await getDocs(exerciseUserCollection);
    const sets = [];

    querySnapshot.forEach((doc) => {
      const setsData = doc.data();
      sets.push(...setsData.sets);
    });
    return sets;
  } catch (error) {
    console.error("Error fetching sets by exercise id:", error);
  }
};
