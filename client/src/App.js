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

class DeleteContact extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onDelete();
  }

  render() {
    return(
      <a href='' onClick={this.handleClick}>Delete</a>
    );
  }

}

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      contact: {
        _id: '',
        name: '',
        numbers: []
      },
      redirect: false
    };
  }

  handleDelete() {
    fetch('/contacts/' + this.state.contact._id, {
      method: 'DELETE'
    }).then( (res) => {
      this.setState( {redirect: true});
    })
  }

  componentDidMount() {
    fetch('/contacts/' + this.props.match.params.id)
    .then(res => res.json())
    .then(contact => this.setState({ contact: contact }));
  }

  render() {
    const redirect = this.state.redirect;
    return (
      <div>
        <Header text="Contact" />
        <ContactDetails name={this.state.contact.name} />
        <ContactNumberList numbers={this.state.contact.numbers} />
        <Link to={'/edit/' + this.state.contact._id}>Edit</Link> | <DeleteContact id={this.state.contact._id} onDelete={this.handleDelete} />
        <br />
        <Link to={`/`}>Back</Link>
        {redirect &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

class AddContactPage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name.value,
        numbers: [{
          number: this.number.value,
          description: this.description.value,
          classification: this.classification.value
        }]
      }),
    }).then( (res) => {
      this.setState( {redirect: true});
    })
  }

  render() {
    const {redirect} = this.state;
    return (
      <div>
        <Header text="Add new contact" />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input ref={(ref) => {this.name = ref}} id="name" name="name" type="text" defaultValue="" />

          <label htmlFor="numbers[0].number">Number</label>
          <input ref={(ref) => {this.number = ref}} id="numbers[0].number" name="numbers[0].number" type="text" defaultValue="" />

          <label htmlFor="numbers[0].description">Description</label>
          <input ref={(ref) => {this.description = ref}} id="numbers[0].description" name="numbers[0].description" type="text" defaultValue="" />

          <label htmlFor="numbers[0].classification">Classification</label>
          <select type="dropdown" ref={(ref) => {this.classification = ref}} id="numbers[0].classification" name="numbers[0].classification" defaultValue={"OFFICIAL"}>
            <option value="OFFICIAL">OFFICIAL</option>
            <option value="SECRET">SECRET</option>
            <option value="TOP SECRET">TOP SECRET</option>
          </select>

          <button type="submit">Add contact</button>

        </form>
        <Link to={`/`}>Back</Link>
        {redirect && (
          <Redirect to = {"/"} />
        )}
      </div>
    );
  }
}

class EditContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        _id: '',
        name: '',
        numbers: []
      },
      redirect: false
    };
  }

  componentDidMount() {
    fetch('/contacts/' + this.props.match.params.id)
    .then(res => res.json())
    .then(contact => this.setState({ contact: contact }));
  }

  render() {
    const {redirect} = this.state;
    return (
      <div>
        <Header text="Edit contact" />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input ref={(ref) => {this.name = ref}} id="name" name="name" type="text" value={this.state.contact.name} />
          {/* Need to use numbers.map here I think */}
          <label htmlFor="numbers[0].number">Number</label>
          <input ref={(ref) => {this.number = ref}} id="numbers[0].number" name="numbers[0].number" type="text" value={this.state.contact.numbers[0].number} />

          <label htmlFor="numbers[0].description">Description</label>
          <input ref={(ref) => {this.description = ref}} id="numbers[0].description" name="numbers[0].description" type="text" value={this.state.contact.numbers[0].description} />

          <label htmlFor="numbers[0].classification">Classification</label>
          <select type="dropdown" ref={(ref) => {this.classification = ref}} id="numbers[0].classification" name="numbers[0].classification" value={this.state.contact.numbers[0].classification} defaultValue={"OFFICIAL"}>
            <option value="OFFICIAL">OFFICIAL</option>
            <option value="SECRET">SECRET</option>
            <option value="TOP SECRET">TOP SECRET</option>
          </select>

          <button type="submit">Update contact</button>

        </form>
        <Link to={`/`}>Back</Link>
        {redirect && (
          <Redirect to = {"/"} />
        )}
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
            <Route path="/edit/:id" component={EditContactPage} />
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
