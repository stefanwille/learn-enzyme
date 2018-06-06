import React from "react";
import { mount } from "enzyme";
import App from "./App";

const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate("change", {
    target: { value: newValue }
  });

  return wrapper.find(instance);
};

test("user can fill out and submit to API", () => {
  const wrapper = mount(<App />);

  const firstName = updateInput(
    wrapper,
    '[field="firstName"] input',
    "Esteban"
  );
  expect(firstName.props().value).toBe("Esteban");

  const lastName = updateInput(wrapper, '[field="lastName"] input', "Caldron");
  expect(lastName.props().value).toBe("Caldron");

  const gender = updateInput(
    wrapper,
    '[field="gender"] input[value="male"]',
    "male"
  );
  expect(gender.props().value).toBe("male");

  const bio = updateInput(wrapper, '[field="bio"] textarea', "My bio");
  expect(bio.props().value).toBe("My bio");
});
