import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    resetUser(state, action) {
      state.user = null;
    },
    setUserDisplayName(state, action) {
      state.user = {
        ...state.user,
        displayName: action.payload,
      };
    },
    setUserFullName(state, action) {
      state.user = {
        ...state.user,
        fullName: action.payload,
      };
    },
    addUserFriend(state, action) {
      state.user = {
        ...state.user,
        friends: [action.payload, ...(state.user.friends || {})],
      };
    },
    removeUserFriend(state, action) {
      const friendsToDeleteFrom = state.user.friends;
      delete state.user.friends[action.payload];
      state.user.friends = friendsToDeleteFrom;
    },
    removePendingFriendRequest(state, action) {
      const filteredPendingFriendRequest =
        state.user.pendingFriendRequests.filter(({ request_id }) => {
          request_id !== action.payload;
        });
      state.user.pendingFriendRequests = filteredPendingFriendRequest;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectFriends = (state) => state.user.user.friends;
export const selectFriendNameByFriendId = createSelector(
  [selectFriends],
  (friends) => (friendId) => {
    return friends ? friends[friendId] : null;
  }
);
export const {
  setUser,
  resetUser,
  setUserFullName,
  setUserDisplayName,
  addUserFriend,
  removeUserFriend,
  removePendingFriendRequest,
} = userSlice.actions;
export default userSlice.reducer;
