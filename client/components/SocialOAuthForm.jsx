import React from 'react';
import { Button } from 'reactstrap';

export default class SocialOAuthForm extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object,
  };

  componentDidMount() {
    if (this.context.loggedIn) {
      this.context.router.push('/profile');
    }
  };

  render() {
    const authLink = `/auth/google?redirect_link=${this.props.location.pathname}`;

    return (
      <div className="col-sm-12 text-center">
        <a href={authLink}>
          <Button className="btn pointer" size="lg">
            Login with Google
          </Button>
        </a>
      </div>
    );
  }
}