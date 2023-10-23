import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const auth = getAuth();
export const updateUserFullName = async (newFullName) => {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);

  await updateDoc(currentUserRef, { fullName: newFullName });
};
