import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserDetailsById(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  let userData = null;
  if (docSnap.exists()) {
    const docData = docSnap.data();
    userData = {
      name: docData.fullName,
      email: docData.providerData.email,
      friends: docData.friends,
    };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return userData;
}
