import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MenteeIntakeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {response: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.getArrayOfConsecutiveInts = this.getArrayOfConsecutiveInts.bind(this);
    this.renderPersonalInformation = this.renderPersonalInformation.bind(this);
    this.renderSelectInput = this.renderSelectInput.bind(this);
    this.renderGoals = this.renderSkills.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
    this.renderEmploymentHistory = this.renderEmploymentHistory.bind(this);
  }

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
    console.log(events.target.value);
  }

  renderOptions(value) {
    return (
      <option key={value}>{value}</option>
    );
  }

  renderCheckBox(displayName, fieldName) {
    return (
      <div>
        <Input type="checkbox" name={fieldName} onChange={this.handleCheckboxChange} />{displayName}
      </div>
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
            {options.map(this.renderOptions)}
          </Input>
        </Label>
      </FormGroup>
    );
  }

  renderCheckboxInput(displayName, fieldName, fields) {
    return (
      <FormGroup key={fieldName}>
        <Label>
          {displayName + ':'}
          {fields.map((field) => {
            this.renderCheckboxField(fieldName, field);
          })}
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
            <Input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange}/>
          </Label>
          <Label>
            Last Name:
            <Input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange}/>
          </Label>
        </FormGroup>
        <Label>
          Date of Birth(Month-Day-Year):
        </Label>
        <FormGroup key="dob" row style={{marginLeft: 0}}>
          <Input name="month" className="col-sm-1" type="select" value={this.state.month} onChange={this.handleChange}>
            {this.getArrayOfConsecutiveInts(12).map(this.renderOptions)}
          </Input>
          <Input name="day" className="col-sm-1" type="select" value={this.state.day} onChange={this.handleChange}>
            {this.getArrayOfConsecutiveInts(31).map(this.renderOptions)}
          </Input>
          <Input name="year" className="col-sm-2" type="select" value={this.state.year} onChange={this.handleChange}>
            {this.getArrayOfConsecutiveInts(70).map(n => 2018 - n).map(this.renderOptions)}
          </Input>
        </FormGroup>
        {this.renderTextInput('Phone Number', 'phone')}
        {this.renderTextInput('Email', 'email')}
        {this.renderTextInput('Mailing Address', 'address')}
        {this.renderSelectInput('Program', 'program', ['Bridge', 'Residential Shelter'])}
        {this.renderTextInput('Case Manager (residential only)', 'caseManager')}
      </div>
    );
  }

  renderGoals() {
    return (
      <div>
        <h1>Goals</h1>
        <h3>Please indicate the reasons that you are seeking Career Development Services</h3>
        {this.renderCheckBox('Acquire full-time employment', 'full-time')}
        {this.renderCheckBox('Acquire part-time employment', 'part-time')}
        {this.renderCheckBox('Increase income/hours', 'income')}
        {this.renderCheckBox('Change career path', 'career')}
        {this.renderCheckBox('Enroll in 2 or 4 year University Program', 'enroll-university')}
        {this.renderCheckBox('Enroll in technical degree or certification program', 'enroll-technical')}
        {this.renderCheckBox('Overcome barrier to employment (Acquire GED, computer skills, English tutoring, interview skills, professional attire, resume building, criminal record expungement, improving credit)', 'barrier')}
        {this.renderCheckBox('Other (please specify)', 'other')}
        {this.renderTextInput('If you chose other, please specify', 'other')}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Personal Information</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderPersonalInformation()}
          {this.renderGoals()}
        </Form>
      </div>
    );
  }
}