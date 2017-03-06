import React from 'react';
import SocialOAuthForm from 'components/SocialOAuthForm.jsx';

export default class MenteeSignupForm extends React.Component {
  render() {
    const titleStyle = {
      color: '#00b2c4',
    };

    const descriptionStyle = {
      fontSize: 15,
      float: 'right',
      width: '50%',
      textAlign: 'left',
      color: '#808083',
      verticalAlign: 'middle',
    };

    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <h1 className="col-sm-12 text-center" style={titleStyle}>EDUCATION TO EMPLOYMENT (E2E)</h1>
            <div style={{marginTop: 50, marginBottom: 80}}>
              <img className="col-sm-6" src="client/img/loginpromo.jpg"/>
              <h3 className="col-sm-6 text-center" style={descriptionStyle}>
                E2E is a new program aimed at increasing a family’s ability to earn a living wage with both in-house training and skills-based education provided in partnership with external job training agencies and Bay Area employers. Volunteers will be integral in many aspects of E2E including providing valuable career related mentorship to E2E scholars. The first step to becoming an E2E mentor is filling out the application below.
              </h3>
            </div>
            <SocialOAuthForm {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}