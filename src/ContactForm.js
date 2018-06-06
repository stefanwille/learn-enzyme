import React from "react";
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from "react-form";

const ContactForm = () => (
  <Form
    onSubmit={formValues => console.log("Form onSubmit", formValues)}
    render={formApi => (
      <form onSubmit={formApi.submitForm} className="ContactForm">
        <Text field="firstName" placeholder="First Name" />
        <Text field="lastName" placeholder="Last Name" />
        <RadioGroup field="gender" data-test-id="gender">
          <Radio value="male" data-test-id="male" /> Male
          <Radio value="female" data-test-id="female" /> Female
        </RadioGroup>
        <TextArea field="bio" />
        <div>
          <Checkbox field="agreesToTerms" data-test-id="agreeToTerms" /> I agree
          to terms
        </div>
        <button type="submit" data-test-id="submit">
          Submit
        </button>
      </form>
    )}
  />
);

export default ContactForm;
