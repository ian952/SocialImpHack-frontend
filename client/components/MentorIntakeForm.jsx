import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MentorIntakeForm extends React.Component {
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
    this.renderSkills = this.renderSkills.bind(this);
    this.renderEmploymentHistory = this.renderEmploymentHistory.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
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
      </div>
    );
  }

  renderSkills() {
    return (
      <div>
        <h1>Experience & Skills</h1>
        {this.renderSelectInput('Are you currently employed?', 'isCurrentlyEmployed', ['Yes', 'No'])}
        {this.renderTextInput('Occupation', 'occupation')}
        {this.renderTextInput('Job Title', 'jobTitle')}
        {this.renderTextInput('Highest level of education:', 'educationLevel')}
        {this.renderSelectInput('Are you a student?', 'isStudent', ['Yes', 'No'])}
        {this.renderTextInput('Name of School', 'currentSchool')}
        {this.renderTextInput('Major', 'major')}
        {this.renderSelectInput('Do you have any experience mentoring?', 'hasMentoringExperience', ['Yes', 'No'])}
        {this.renderTextInput('If so, please describe', 'mentoringExperience')}
        {this.renderSelectInput('Are you fluent in any language other than English?', 'fluentLanguages', [
          'Spanish',
          'Chinese',
          'Tagalog',
          'Viatnamese',
          'Korean',
          'Farsi Persian',
          'Armenian',
          'Russian',
          'Arabic',
          'Khmer',
          'Cambodian',
          'Others',
        ])}
        {this.renderTextInput('If you chose others, please specify', 'otherFluentLanguages')}
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

  renderEmploymentHistory() {
    return (
      <div>
        <h3>Which of the following topics do you feel qualified to offer Raphael House scholars support with?</h3>
        <FormGroup key="goals" style={{marginLeft: 20}}>
          {this.renderCheckBox('basic-professional-development', 'Basic Professional Development')}
          {this.renderCheckBox('crimial-record-expungement', 'Criminal record expungement')}
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
          {this.renderSkills()}
          {this.renderEmploymentHistory()}
        </Form>
      </div>
    );
  }
}