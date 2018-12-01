import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  validatePassword = (pw) => {
    let lowercase = false;
    let uppercase = false;
    let special = false;
    let length = pw.length > 8;

    for (let i = 0; i < length; ++i) {
      const letter = pw[i];
      if (letter.toUpperCase() !== letter.toLowerCase()) {
        // Number, not letter
        special = true;
      } else if (letter === letter.toUpperCase()) {
        uppercase = true;
      } else if (letter === letter.toLowerCase()) {
        lowercase = true;
      }
    }

    return lowercase && special && uppercase && length;
  };

  validateOrderNum = (num) => {
    return num < 400;
  };

  render() {
    return (
      <div className="App">
        <Field
          placeholder="Order number"
          validationFn={this.validateOrderNum}
          fieldType="number"
        />
        <Field
          placeholder="Password"
          validationFn={this.validatePassword}
          fieldType="password"
        />
      </div>
    );
  };
};

class Field extends React.Component {
  state = {
    content: "",
    valid: false,
    typedIn: false,
  };

  onChange = (e) => {
    this.setState({
      content: e.target.value,
      valid: this.props.validationFn(e.target.value),
      typeIn: true,
    });
  };

  render() {
    return (
      <input
        type={this.props.fieldType}
        value={this.state.content}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    )
  }
};

export default App;
