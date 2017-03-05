import React from 'react';
import SocialOAuthForm from 'components/SocialOAuthForm.jsx';

export default class MenteeSignupForm extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <h1 className="col-sm-12 text-center">Education to Employment</h1>

            <h3 className="col-sm-12 text-center">Career development and training stuff</h3>

            <SocialOAuthForm {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}