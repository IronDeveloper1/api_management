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

class NumberFormItem extends Component {
    render() {
      return (
        <div>
          <label htmlFor={"numbers[" + this.props.index + "].number"}>Number</label>
          <input ref={(ref) => {this.number = ref}} id={"numbers[" + this.props.index + "].number"} name="number" type="text" value={this.props.number.number} onChange={this.props.handleChange}/>
          
          <label htmlFor={"numbers[" + this.props.index + "].description"}>Description</label>
          <input ref={(ref) => {this.description = ref}} id={"numbers[" + this.props.index + "].description"} name="description" type="text" value={this.props.number.description} onChange={this.props.handleChange}/>
  
          <label htmlFor={"numbers[" + this.props.index + "].classification"}>Classification</label>
          <select type="dropdown" ref={(ref) => {this.classification = ref}} id={"numbers[" + this.props.index + "].classification"} name="classification" value={this.props.number.classification} onChange={this.props.handleChange}>
            <option value="OFFICIAL">OFFICIAL</option>
            <option value="SECRET">SECRET</option>
            <option value="TOP SECRET">TOP SECRET</option>
          </select>
          <button type="button" onClick={this.props.handleRemoveNumber}>Remove</button>
        </div>
      );
    }
  }
  
  class EditContactPage extends Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleAddNumber = this.handleAddNumber.bind(this);
      this.handleRemoveNumber = this.handleRemoveNumber.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        contact: {
          _id: '',
          name: '',
          numbers: []
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

        fetch('/contacts/' + this.state.contact._id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.contact),
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
      const {redirect} = this.state;
      return (
        <div>
          <Header text="Edit contact" />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input ref={(ref) => {this.name = ref}} id="name" name="name" type="text" value={this.state.contact.name} onChange={this.handleNameChange}/>
            {this.state.contact.numbers.map((number, index) => 
              <NumberFormItem key={index}
                            number={number} 
                            index={index} 
                            handleChange={(event) => this.handleNumberChange(index, event)}
                            handleRemoveNumber={(event) => this.handleRemoveNumber(index, event)} />
            )}
            <button type="button" onClick={this.handleAddNumber}>Add number</button><br />
            <button type="submit" onClick={this.handleSubmit}>Update contact</button>
          </form>
          <br />
          <Link to={`/view/` + this.state.contact._id}>Back</Link>
          {redirect && (
            <Redirect to = {"/view/" + this.state.contact._id} />
          )}
        </div>
      );
    }
  }

  export default EditContactPage;