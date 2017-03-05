import React from 'react';

export default class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.selectMentor = this.selectMentor.bind(this);
  }

  selectMentor(e) {
    e.preventDefault();
    console.log('sad');
    console.log(e.target.value);
  }

  render() {
    const matches = this.props.matches.map((match) => {
      <MatchItem
        match={match}
        onClick={this.selectMentor}
      />
    });

    let error = null;
    if (matches.length == 0) {
      error = (
        <p>No matches yet...</p>
      );
    }

    return (
      <div>
        <div> 
          {error}
          {matches}
        </div>
      </div>
    );
  }
}