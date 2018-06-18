import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import { Button } from 'react-bootstrap';
import AddContactPage from './components/Add';
import EditContactPage from './components/Edit';
import ViewContactPage from './components/View';

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
      <Button bsStyle="link"><Link to={`/add`}>+ Add New Contact</Link></Button>
    );
  }
}

class ContactListItem extends Component {
  render() {
    return (
      <li>
        <Link to={`/view/${this.props.contact._id}`}>{this.props.contact.name}</Link>
      </li>
    );
  }
}

class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(contact =>
          <ContactListItem key={contact._id} contact={contact} />)}
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

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/view/:id" component={ViewContactPage} />
            <Route exact path="/add" component={AddContactPage} />
            <Route path="/edit/:id" component={EditContactPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;