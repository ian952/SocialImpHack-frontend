import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MenteeIntakeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {goals: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.getArrayOfConsecutiveInts = this.getArrayOfConsecutiveInts.bind(this);
    this.renderPersonalInformation = this.renderPersonalInformation.bind(this);
    this.renderSelectInput = this.renderSelectInput.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState((prevState) => {
      const newState = prevState;
      if (target.checked) {
        newState.goals.push(name);
        return newState;
      } else {
        const ind = newState.goals.indexOf(name);
        newState.goals = newState.goals.splice(1, ind);
        return newState;
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  renderOptions(value) {
    return (
      <option key={value}>{value}</option>
    );
  }

  getArrayOfConsecutiveInts(n) {
    return Array.apply(null, {length: n}).map(Number.call, Number).map((v) => v+1);
  }

  renderTextInput(displayName, fieldName) {
    return (
      <FormGroup key={fieldName}>
        <Label>
          {displayName + ':'}
        </Label>
        <Input name={fieldName} type="text" value={this.state[fieldName]} onChange={this.handleChange} />
      </FormGroup>
    );
  }

  renderSelectInput(displayName, fieldName, options) {
    return (
      <FormGroup key={fieldName}>
        <Label>
          {displayName + ':'}
          <Input name={fieldName} type="select" value={this.state[fieldName]} onChange={this.handleChange}>
            <option key="empty"></option>
            {options.map(this.renderOptions)}
          </Input>
        </Label>
      </FormGroup>
    );
  }

  renderPersonalInformation() {
    return (
      <div>
        {this.renderSelectInput('Title', 'title', ["Mr", "Ms", "Mrs", "Miss"])}
        <FormGroup key="name">
          <Label>
            First Name:
            <Input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
          </Label>
          <Label>
            Last Name:
            <Input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
          </Label>
        </FormGroup>
        <Label>
          Date of Birth(Month-Day-Year):
        </Label>
        <FormGroup key="dateOfBirth" row style={{marginLeft: 0}}>
          <Input name="dateOfBirth" type="date" value={this.state.dateOfBirth} onChange={this.handleChange} />
        </FormGroup>
        {this.renderTextInput('Phone Number', 'phone')}
        {this.renderTextInput('Email', 'email')}
        {this.renderTextInput('Mailing Address', 'address')}
      </div>
    );
  }

  renderCheckBox(displayName, fieldName) {
    return (
      <div>
        <Input type="checkbox" name={fieldName} onChange={this.handleCheckboxChange} />{displayName}
      </div>
    );
  }

  renderGoals() {
    return (
      <div>
        <h3>Please indicate the reasons that you are seeking Career Development Services</h3>
        <FormGroup key="goals" style={{marginLeft: 20}}>
          {this.renderCheckBox('Acquire full-time employment', 'full-time')}
          {this.renderCheckBox('Acquire part-time employment', 'part-time')}
          {this.renderCheckBox('Increase income/hours', 'income')}
          {this.renderCheckBox('Change career path', 'career')}
          {this.renderCheckBox('Enroll in 2 or 4 year University Program', 'enroll-university')}
          {this.renderCheckBox('Enroll in technical degree or certification program', 'enroll-technical')}
          {this.renderCheckBox('Overcome barrier to employment (Acquire GED, computer skills, English tutoring, interview skills, professional attire, resume building, criminal record expungement, improving credit)', 'barrier')}
          {this.renderCheckBox('Other (please specify)', 'other')}
          {this.renderTextInput('If you chose other, please specify', 'other')}
        </FormGroup>
      </div>
    );
  }

  render() {
    console.log('updated');
    return (
      <div className="container">
        <h1>Personal Information</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderPersonalInformation()}
          {this.renderGoals()}
          <Button onSubmit={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}