import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  render() {
    return (
      <h1>{this.props.text}</h1>
    );
  }
}

class AddContactLinkBar extends Component {
  render() {
    return(
      <Link to={`/add`}>Add New Contact</Link>
    );
  }
}

class ContactListItem extends Component {
  render() {
    return (
      <li key={this.props.contact._id}>
        <Link to={`/contact/${this.props.contact._id}`}>{this.props.contact.name}</Link>
      </li>
    );
  }
}

class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(contact =>
          <ContactListItem contact={contact} />)}
      </ul>
    );
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {contacts: []};
  }

  componentDidMount() {
    fetch('/contacts')
      .then(res => res.json())
      .then(contacts => this.setState({ contacts }));
  }

  render() {
    return (
      <div>
        <Header text="PhoneBook" />
        <AddContactLinkBar />
        <ContactList contacts={this.state.contacts}/>
      </div>
    );
  }
}

class ContactNumberListItem extends Component {
  render() {
    return(
      <li>{this.props.number.description}: {this.props.number.number} ({this.props.number.classification})</li>
    );
  }
}

class ContactNumberList extends Component {
  render() {
    return(
      <ul>
        {this.props.numbers.map(number =>
          <ContactNumberListItem number={number} />)}
      </ul>
    );
  }
}

class ContactDetails extends Component {
  render() {
    return(
      <h3>{this.props.name}</h3>
    );
  }
}

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {contact: {name:'',numbers: []}};
  }

  componentDidMount() {
    fetch('/contacts/' + this.props.match.params.id)
    .then(res => res.json())
    .then(contact => this.setState({ contact }));
  }

  render() {
    return (
      <div>
        <Header text="Contact" />
        <ContactDetails name={this.state.contact.name} />
        <ContactNumberList numbers={this.state.contact.numbers} />
        <Link to={`/`}>Back</Link>
      </div>
    );
  }
}

class AddContactPage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify(new FormData(event.target));

    fetch('/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test',
        numbers: [
          {number: '5678', description: 'mobile', classification: 'OFFICAL'}
        ]
      }),
    })
  }

  render() {
    return (
      <div>
        <Header text="Add new contact" />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" />

          <label htmlFor="numbers[0].number">Number</label>
          <input id="numbers[0].number" name="numbers[0].number" type="text" />

          <label htmlFor="numbers[0].description">Description</label>
          <input id="numbers[0].description" name="numbers[0].description" type="text" />

          <label htmlFor="numbers[0].classification">Classification</label>
          <input id="numbers[0].classification" name="numbers[0].classification" type="text" />

          <button type="submit">Add contact</button>

        </form>
        <Link to={`/`}>Back</Link>
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/contact/:id" component={ContactPage} />
            <Route exact path="/add" component={AddContactPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

/**
 * - App
 *  - HomePage
 *    - Header
 *    - AddContactLinkBar
 *    - ContactList
 *      - ContactListItem
 *  - ContactPage
 *    - Header
 *    - ContactDetails
 *    - ContactNumberList
 *      - ContactNumberListItem
 *  - AddContactPage
 *    - Header
 *    - TODO
 */
