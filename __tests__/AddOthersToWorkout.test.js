import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddOthersToWorkout from "../app/(main)/workouts/addOthersToWorkout";

describe("AddOthersToWorkout Component", () => {
  const membersIds = [1, 2, 3];
  const workoutMembers = [1, 2];
  const setWorkoutMembers = jest.fn();
  const setShow = jest.fn();

  it("handles member toggle correctly", () => {
    const { getByTestId } = render(
      <AddOthersToWorkout
        show={true}
        membersIds={membersIds}
        workoutMembers={workoutMembers}
        setWorkoutMembers={setWorkoutMembers}
        setShow={setShow}
      />
    );

    const memberItem = getByTestId("member-1"); // Replace 1 with an actual user ID
    fireEvent.press(memberItem); // Simulate pressing the member item

    // You can add assertions here to check if the state is updated correctly
  });

  it("closes the modal on pressing close button", () => {
    const { getByTestId } = render(
      <AddOthersToWorkout
        show={true}
        membersIds={membersIds}
        workoutMembers={workoutMembers}
        setWorkoutMembers={setWorkoutMembers}
        setShow={setShow}
      />
    );

    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);

    expect(setShow).toHaveBeenCalledWith(false); // Check if setShow function is called with false
  });
});
