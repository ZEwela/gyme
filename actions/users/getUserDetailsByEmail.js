import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export async function getUserDetailsByEmail(email) {
  try {
    const usersCollection = query(
      collection(db, "usersList"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(usersCollection);
    const users = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push(userData);
    });
    return users;
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
}
