import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function listElementFunction(props) {
  return (
    <li>{props.description}: {props.number} ({props.classification})</li>
  );
}

class App extends Component {

  state = {contacts: []}

  componentDidMount() {
    fetch('/contacts')
      .then(res => res.json())
      .then(contacts => this.setState({ contacts }));
  }


  render() {
    return (
      <div className="App">
        <h1>Contacts</h1>
        {this.state.contacts.map(contact =>
          <div key={contact._id}>
            <h3>{contact.name}</h3>
          </div>)}
      </div>
    );
  }
}

export default App;
