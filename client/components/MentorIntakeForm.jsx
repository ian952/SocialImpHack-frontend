import React from 'react';

export default class MentorIntakeForm extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.params.code}</h1>
      </div>);
  }
}