import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { Badge, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';

function getBadgeColor(classification) {
  switch(classification) {
    case "OFFICIAL":
      return "badge-primary";
    case "SECRET":
      return "badge-warning";
    case "TOP SECRET":
      return "badge-danger";
    default:
      return "badge-secondary";
  }
}

class Header extends Component {
    render() {
      return (
        <div>
          <h1>{this.props.text}</h1>
        </div>
      );
    }
  }

class ContactNumberListItem extends Component {
    render() {
      return(
        <ListGroupItem>
          <div>
            <h4 className="list-group-item-heading">{this.props.number.description}
            <Badge pullRight className={getBadgeColor(this.props.number.classification)}>{this.props.number.classification}</Badge></h4>
          </div>
          {this.props.number.number}
        </ListGroupItem>
      );
    }
  }
  
  class ContactNumberList extends Component {
    render() {
      return(
        <ListGroup>
          {this.props.numbers.map(number =>
              <ContactNumberListItem key={number._id} number={number} />
            )}
        </ListGroup>
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
        <a style={{color: 'white'}} href='' onClick={this.handleClick}>Delete</a>
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
          <ButtonToolbar>
            <Button bsStyle="primary"><Link to={'/edit/' + this.state.contact._id} style={{color: 'white'}}>Edit</Link></Button>
            <Button bsStyle="danger"><DeleteContact id={this.state.contact._id} onDelete={this.handleDelete} /></Button>
          </ButtonToolbar>
          <ButtonToolbar>
            <Button bsStyle="link"><Link to={`/`}>Back</Link></Button>
          </ButtonToolbar>
          {redirect &&
            <Redirect to="/" />
          }
        </div>
      );
    }
  }

  export default ViewContactPage;