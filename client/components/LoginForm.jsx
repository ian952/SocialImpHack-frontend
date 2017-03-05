import MenteeSignupForm from 'components/MenteeSignupForm.jsx';
import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    console.log('login!');
    return (
      <MenteeSignupForm { ...this.props } />
    );
  }
}