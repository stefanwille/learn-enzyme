import React from "react";
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from "react-form";

const ContactForm = () => (
  <Form
    onSubmit={formValues => console.log("Form onSubmit", formValues)}
    render={formApi => (
      <form onSubmit={formApi.submitForm} className="ContactForm">
        <Text field="firstName" placeholder="First Name" />
        <Text field="lastName" placeholder="Last Name" />
        <RadioGroup field="gender">
          <Radio value="male" /> Male
          <Radio value="female" /> Female
        </RadioGroup>
        <TextArea field="bio" />
        <div>
          <Checkbox field="agreesToTerms" /> I agree to terms
        </div>
        <button type="submit">Submit</button>
      </form>
    )}
  />
);

export default ContactForm;
