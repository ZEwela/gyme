import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetItem from "./SetItem";
import AddSet from "./AddSet";
import {
  addMembersSetsByExerciseId,
  selectMembersSets,
} from "../../store/slices/userWorkoutsSlice";
import { getUserSetsByExerciseId } from "../../actions/exercises/getUserSetsByExerciseId";
import { selectFriendNameByFriendId } from "../../store/slices/userSlice";

const MemberExerciseCard = ({ memberId, exerciseId }) => {
  const dispatch = useDispatch();
  const membersSetsFromStore = useSelector(selectMembersSets);
  const memberName = useSelector((state) =>
    selectFriendNameByFriendId(state)(memberId)
  );

  const [sets, setSets] = useState(
    membersSetsFromStore &&
      membersSetsFromStore[memberId] &&
      membersSetsFromStore[memberId][exerciseId]
      ? membersSetsFromStore[memberId][exerciseId]
      : []
  );

  useEffect(() => {
    if (sets.length > 0) {
      return;
    } else {
      const getUserSets = async () => {
        const userSets = await getUserSetsByExerciseId(memberId, exerciseId);

        if (userSets) {
          setSets(userSets);
          const data = {
            memberId: memberId,
            sets: userSets,
            exerciseId: exerciseId,
          };

          dispatch(addMembersSetsByExerciseId(data));
        }
      };

      getUserSets();
    }
  }, []);

  const removeSet = (setOrder) => {
    const updatedSets = sets.filter((set) => set.set_order !== setOrder);
    setSets([...updatedSets]);
    dispatch(addMembersSetsByExerciseId({ memberId, updatedSets, exerciseId }));
  };
  const updateSet = (setOrder, newWeight, newReps, newHold, newNote) => {
    const updatedSets = sets.map((set) => {
      if (set.set_order === setOrder) {
        return {
          ...set,
          weight: newWeight,
          reps: newReps,
          hold: newHold,
          note: newNote,
          created_at: new Date().toISOString(),
        };
      }
      return set;
    });
    setSets([...updatedSets]);
    dispatch(addMembersSetsByExerciseId({ memberId, updatedSets, exerciseId }));
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{memberName.displayName}</Text>

      <FlatList
        data={sets}
        keyExtractor={(item) => item.set_order.toString()}
        renderItem={({ item }) => (
          <SetItem
            previousReps={item.reps}
            previousWeight={item.weight}
            previousSetOrder={item.set_order}
            previousHold={item.hold}
            previousNote={item.note}
            removeSet={removeSet}
            updateSet={updateSet}
          />
        )}
        horizontal={true}
        ListFooterComponent={
          <AddSet
            sets={sets}
            setSets={setSets}
            exerciseId={exerciseId}
            memberId={memberId}
          />
        }
      />
    </View>
  );
};

export default MemberExerciseCard;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#BACBA9",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "#8EAB73",
    margin: 5,
    padding: 10,
    width: "300px",
  },
});
