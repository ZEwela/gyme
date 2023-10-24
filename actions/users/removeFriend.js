import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const removeFriend = async (friendToRemove) => {
  // Get the current user's data
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const currentUserData = (await getDoc(currentUserRef)).data();

  if (Array.isArray(currentUserData.friends)) {
    // Find the index of the friend to remove
    const findUser = (friend) => {
      return friend._id === friendToRemove._id;
    };
    const friendIndex = currentUserData.friends.findIndex(findUser);

    // Remove
    if (friendIndex !== -1) {
      currentUserData.friends.splice(friendIndex, 1);
      await updateDoc(currentUserRef, { friends: currentUserData.friends });

      console.log("Friend removed successfully!");
    } else {
      console.log("Friend not found in the list.");
    }
  } else {
    console.log("Error: Friends field is not defined or not an array.");
  }
};
