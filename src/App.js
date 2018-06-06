import React, { Component } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

class App extends Component {
  handleFormSubmit = formValues => {
    axios.post("localhost:3000/something", formValues);
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
