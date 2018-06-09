import React from "react";
import { mount } from "enzyme";
import App from "./App";
import axios from "axios";

const findFormElement = (wrapper, fieldName, formElementSubSelector) => {
  const selector = `[field="${fieldName}"] ${formElementSubSelector}`;
  const formElement = wrapper.find(selector);
  if (formElement.length > 1) {
    throw new Element(
      `Found > 1 form elements for selector ${selector} in: ${formElement.debug()}`
    );
  }
  return formElement;
};

const checkCheckbox = (wrapper, fieldName, checked) => {
  const input = findFormElement(wrapper, fieldName, "input");
  if (input.length === 0) {
    throw new Error(
      `Could not find checkbox for field ${fieldName} in ${wrapper.debug()}`
    );
  }
  // input.simulate("click");
  input.simulate("change", { target: { checked } });
  return findFormElement(wrapper, fieldName, "input");
};

const selectRadioButton = (wrapper, fieldName, radioButtonValue) => {
  const input = findFormElement(
    wrapper,
    fieldName,
    `input[value="${radioButtonValue}"]`
  );
  if (input.length === 0) {
    throw new Error(
      `Could not find radio button for field ${fieldName} and value ${radioButtonValue}`
    );
  }
  input.simulate("change", {
    target: { value: radioButtonValue }
  });

  return findFormElement(
    wrapper,
    fieldName,
    `input[value="${radioButtonValue}"]`
  );
};

const findInputOrTextarea = (wrapper, fieldName) => {
  const input = findFormElement(wrapper, fieldName, "input");
  if (input.length === 1) {
    return input;
  }

  const textarea = findFormElement(wrapper, fieldName, "textarea");
  if (textarea.length === 1) {
    return textarea;
  }

  throw new Error(
    `Could not find textarea or input for fieldName ${fieldName} in ${wrapper.debug()}`
  );
};

const enterText = (wrapper, fieldName, newValue) => {
  const input = findInputOrTextarea(wrapper, fieldName);
  input.simulate("change", {
    target: { value: newValue }
  });

  return findInputOrTextarea(wrapper, fieldName);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function nextTick() {
  return sleep(0);
}

test("user can fill out and submit to API", async () => {
  const wrapper = mount(<App />);
  const form = wrapper.find("form");

  const firstName = enterText(wrapper, "firstName", "Esteban");
  expect(firstName.props().value).toBe("Esteban");

  const lastName = enterText(wrapper, "lastName", "Caldron");
  expect(lastName.props().value).toBe("Caldron");

  const gender = selectRadioButton(wrapper, "gender", "male");
  expect(gender.props().value).toBe("male");

  const bio = enterText(wrapper, "bio", "My bio");
  expect(bio.props().value).toBe("My bio");

  const agreesToTerms = checkCheckbox(wrapper, "agreesToTerms", true);
  expect(agreesToTerms.props().checked).toBe(true);

  const apiRequestPromise = Promise.resolve({ data: "cool, done" });
  jest.spyOn(axios, "post").mockImplementation(async (url, data) => {
    return apiRequestPromise;
  });

  wrapper.find(".ContactForm").simulate("submit", { preventDefault: () => {} });
  await nextTick();
  // console.log("**call", App.prototype.handleFormSubmit.mock.calls);
  expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/something", {
    agreesToTerms: true,
    bio: "My bio",
    firstName: "Esteban",
    lastName: "Caldron"
  });
});
