import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <h1>{this.props.text}</h1>
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
            <ContactNumberListItem key={number._id} number={number} />)}
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

class ViewContactPage extends Component {
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

  export default ViewContactPage;