import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const sendFriendRequest = async (newFriend) => {
  // Create a friend request document in Firestore
  const friendRequestDoc = doc(
    db,
    "friendRequests",
    auth.currentUser.uid + newFriend._id
  );

  const userRef = doc(db, "users/" + auth.currentUser.uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  setDoc(friendRequestDoc, {
    request_id: auth.currentUser.uid + newFriend._id,
    sender: auth.currentUser.uid,
    recipient: newFriend._id,
  });

  // Add the request to the recipient's pending friend requests
  const recipientUserRef = doc(db, "users", newFriend._id);

  const request = {
    sender_id: auth.currentUser.uid,
    sender_displayName:
      userData.displayName || userData.fullName || auth.currentUser.email,
    sender_email: auth.currentUser.email,
    request_id: auth.currentUser.uid + newFriend._id,
  };
  // Retrieve the current array, push the new item, and then update the field
  getDoc(recipientUserRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();
      const currentRequests = currentData.pendingFriendRequests || [];
      currentRequests.push(request);

      // Update the document with the new array
      updateDoc(recipientUserRef, {
        pendingFriendRequests: currentRequests,
      });
    }
  });

  // Add the request to the sender's sent friend requests
  const senderUserRef = doc(db, "users", auth.currentUser.uid);
  const requestSent = {
    recipient_id: newFriend._id,
    request_id: auth.currentUser.uid + newFriend._id,
    recipient_displayName:
      newFriend.displayName || newFriend.fullName || newFriend.email,
    recipient_email: newFriend.email,
  };

  // Retrieve the current array, push the new item, and then update the field
  getDoc(senderUserRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();
      const currentRequests = currentData.sentFriendRequests || [];
      currentRequests.push(requestSent);

      // Update the document with the new array
      updateDoc(senderUserRef, {
        sentFriendRequests: currentRequests,
      });
    }
  });
};
