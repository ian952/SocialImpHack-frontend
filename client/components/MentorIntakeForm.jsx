import axios from 'axios';
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
    const { firstName, lastName, dateOfBirth, phone, email, address } = this.state;
    const isCurrentlyEmployed = this.state.isCurrentlyEmployed === 'Yes';
    const isStudent = this.state.isStudent === 'Yes';
    const hasMentoringExperience = this.state.hasMentoringExperience === 'Yes';
    const userInfo = { firstName, lastName, dateOfBirth, phone, email, address };
    const otherFluentLanguages = this.state.fluentLanguages === 'Others' ? this.state.otherFluentLanguages : this.state.fluentLanguages;
    const { occupation, jobTitle, educationLevel, currentSchool, major, mentoringExperience } = this.state;
    const toSend = {
      userInfo,
      mentorOnly: {
        isCurrentlyEmployed,
        isStudent,
        hasMentoringExperience,
        otherFluentLanguages,
        occupation,
        jobTitle,
        educationLevel,
        isStudent,
        currentSchool,
        major,
        mentoringExperience
      }
    };

    axios.post('/api/v1/person/profile', toSend).then(() => {
      this.context.router.push('/profile');
    });
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
          {this.renderCheckBox('Basic professional development', 'basic-professional-development')}
          {this.renderCheckBox('Criminal record expungement', 'crimial-record-expungement')}
          {this.renderCheckBox('Basic computer skills', 'basic-computer-skills')}
          {this.renderCheckBox('Resume building', 'resume-building')}
          {this.renderCheckBox('Financial literacy counseling (increasing credit score)', 'financial-literacy-conseling')}
          {this.renderCheckBox('Interview skills', 'interview-skills')}
          {this.renderCheckBox('Completing technical degrees or certification programs', 'technical-degrees')}
          {this.renderCheckBox('Acquiring GED', 'acquiring-ged')}
          {this.renderCheckBox('English tutoring', 'english-tutoring')}
          {this.renderCheckBox('Applying for 2 or 4 year University Programs', 'university-programs')}
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
          <Button onSubmit={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}