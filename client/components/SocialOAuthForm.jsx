import React from 'react';

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
          <button className="btn btn-large pointer">
            Login with Google
          </button>
        </a>
      </div>
    );
  }
}