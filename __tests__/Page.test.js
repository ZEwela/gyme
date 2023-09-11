import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";

import Page from "../app/index.js";

describe("<Page />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Page />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
