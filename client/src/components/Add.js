import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

class Header extends Component {
    render() {
      return (
        <h1>{this.props.text}</h1>
      );
    }
  }

class NumberFormItem extends Component {
    render() {
      return (
        <div className="numberGroup">
        <FormGroup controlId={"numbers[" + this.props.index + "].number"}>
          <ControlLabel>Number</ControlLabel>
          <FormControl
            id={"numbers[" + this.props.index + "].number"}
            name="number"
            type="text"
            value={this.props.number.number}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup controlId={"numbers[" + this.props.index + "].description"}>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            id={"numbers[" + this.props.index + "].description"}
            name="description"
            type="text"
            value={this.props.number.description}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup controlId={"numbers[" + this.props.index + "].classification"}>
          <ControlLabel>Classification</ControlLabel>
          <FormControl
            componentClass="select"
            id={"numbers[" + this.props.index + "].classification"}
            name="classification"
            value={this.props.number.classification}
            onChange={this.props.handleChange}
          >
            <option value="OFFICIAL">OFFICIAL</option>
            <option value="SECRET">SECRET</option>
            <option value="TOP SECRET">TOP SECRET</option>
          </FormControl>
        </FormGroup>
          <Button bsStyle="danger" onClick={this.props.handleRemoveNumber}>Remove</Button>
        </div>
      );
    }
  }
  
  class AddContactPage extends Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleAddNumber = this.handleAddNumber.bind(this);
      this.handleRemoveNumber = this.handleRemoveNumber.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        contact: {
          name: "",
          numbers: [
              {
                  number: "",
                  description: "",
                  classification: "OFFICIAL"
              }
          ]
        },
        redirect: false
      };
    }
  
    handleNameChange(event) {
      const cloneState = this.state.contact;
      cloneState[event.target.name] = event.target.value;
      this.setState({contact: cloneState});
    }
  
    handleNumberChange(index, event) {
      const cloneState = this.state.contact;
      let cloneNumberElement = cloneState["numbers"][index];
      cloneNumberElement[event.target.name] = event.target.value;
      cloneState["numbers"][index] = cloneNumberElement;
      this.setState({ contact: cloneState });
    }

    handleAddNumber(event) {
        const emptyNumberElement = {
            number: "",
            description: "",
            classification: "OFFICIAL"
        }
        const cloneState = this.state.contact;
        cloneState.numbers.push(emptyNumberElement);
        this.setState({ contact: cloneState });

    }

    handleRemoveNumber(index, element) {
        const cloneState = this.state.contact;
        cloneState.numbers.splice(index, 1);
        this.setState({ contact: cloneState });
    }
  
    handleSubmit(event) {
        event.preventDefault();

        fetch('/contacts', {
            method: 'POST',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.contact),
          })
          .then( res => res.json())
          .then( (data) => {
            console.log(data);
            this.setState( {
              contact: data,
              redirect: true
            });
          })
    }
  
    render() {
      const {redirect} = this.state;
      return (
        <div>
          <Header text="Add contact" />
          <Form>
          <FormGroup controlId="name">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                id="name"
                name="name"
                type="text"
                value={this.state.contact.name}
                onChange={this.handleNameChange}
              />
            </FormGroup>
            {this.state.contact.numbers.map((number, index) => 
              <NumberFormItem key={index}
                            number={number} 
                            index={index} 
                            handleChange={(event) => this.handleNumberChange(index, event)}
                            handleRemoveNumber={(event) => this.handleRemoveNumber(index, event)} />
            )}
            <ButtonToolbar className="add-number-btn-toolbar">
              <Button bsStyle="primary" onClick={this.handleAddNumber}>Add number</Button>
            </ButtonToolbar>
            <ButtonToolbar className="save-btn-toolbar">
              <Button bsStyle="link"><Link to={`/`}>Back</Link></Button>
              <Button bsStyle="success" onClick={this.handleSubmit}>Save contact</Button>
            </ButtonToolbar>
          </Form>
          {redirect && (
            <Redirect to = {"/view/" + this.state.contact._id} />
          )}
        </div>
      );
    }
  }

  export default AddContactPage;