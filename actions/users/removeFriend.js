import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const removeFriend = async (friendToRemove) => {
  // Get the current user's data
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const currentUserData = (await getDoc(currentUserRef)).data();
  // Remove from user friends array
  if (currentUserData.friends[friendToRemove._id]) {
    delete currentUserData.friends[friendToRemove._id];
    try {
      await updateDoc(currentUserRef, { friends: currentUserData.friends });
    } catch (error) {
      console.error("Error during removing record from friends list: ", error);
    }
  } else {
    console.log("Error: Friend not found in the list.");
  }
  // Get friend's data
  const currentFriendRef = doc(db, "users", friendToRemove._id);
  const currentFriendData = (await getDoc(currentFriendRef)).data();
  // Remove from friend's friends array
  if (currentFriendData.friends[auth.currentUser.uid]) {
    delete currentFriendData.friends[auth.currentUser.uid];
    try {
      await updateDoc(currentFriendRef, { friends: currentFriendData.friends });
    } catch (error) {
      console.error(
        "Error during removing record from friends list, friends data: ",
        error
      );
    }
  } else {
    console.log("Error: Friend not found in the list.");
  }
};
