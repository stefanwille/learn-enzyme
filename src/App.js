import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import ContactForm from "./ContactForm";

class App extends Component {
  handleFormSubmit = formValues => {
    const response = axios.post("http://localhost:3000/something", formValues);
    return response;
  };

  render() {
    return (
      <div className="App">
        <ContactForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default App;
