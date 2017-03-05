import React from 'react';
import { Button } from 'reactstrap';

export default class MatchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mentor = this.props.mentor;
    return (
      <div className="container">
        <p>{mentor.firstName}</p>
        <p>{mentor.lastName}</p>
        <Button color="success" onClick={this.props.selectMentor}>Select</Button>
      </div>
    );
  }
}