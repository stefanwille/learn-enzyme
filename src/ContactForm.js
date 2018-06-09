import React from "react";
import PropTypes from "prop-types";

import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from "react-form";

const ContactForm = props => (
  <Form
    onSubmit={props.onSubmit}
    render={formApi => {
      return (
        <form onSubmit={formApi.submitForm} className="ContactForm">
          {formApi.errors && Object.entries(formApi.errors)}
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
      );
    }}
  />
);

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
