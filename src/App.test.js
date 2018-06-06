import React from "react";
import { mount } from "enzyme";
import App from "./App";

const selectRadioButton = (wrapper, fieldName, newValue) => {
  const selector = `[field="${fieldName}"] input[value="${newValue}"]`;
  const input = wrapper.find(selector);
  if (input.length === 0) {
    throw new Error(`Could not find radio button for selector ${selector}`);
  }
  input.simulate("change", {
    target: { value: newValue }
  });

  return wrapper.find(selector);
};

const enterText = (wrapper, fieldName, newValue) => {
  const selector = `[field="${fieldName}"] input`;
  const input = wrapper.find(selector);
  if (input.length === 0) {
    throw new Error(`Could not find textarea for selector ${selector}`);
  }
  input.simulate("change", {
    target: { value: newValue }
  });

  return wrapper.find(selector);
};

const enterTextarea = (wrapper, fieldName, newValue) => {
  const selector = `[field="${fieldName}"] textarea`;
  const input = wrapper.find(selector);
  if (input.length === 0) {
    throw new Error(`Could not find textarea for selector ${selector}`);
  }
  input.simulate("change", {
    target: { value: newValue }
  });

  return wrapper.find(selector);
};

test("user can fill out and submit to API", () => {
  const wrapper = mount(<App />);

  const firstName = enterText(wrapper, "firstName", "Esteban");
  expect(firstName.props().value).toBe("Esteban");

  const lastName = enterText(wrapper, "lastName", "Caldron");
  expect(lastName.props().value).toBe("Caldron");

  const gender = selectRadioButton(wrapper, "gender", "male");
  expect(gender.props().value).toBe("male");

  const bio = enterTextarea(wrapper, "bio", "My bio");
  expect(bio.props().value).toBe("My bio");
});
