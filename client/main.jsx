import 'styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';

import LoginForm from 'components/LoginForm.jsx';
import MatchList from 'components/MatchList.jsx';
import MenteeIntakeForm from 'components/MenteeIntakeForm.jsx';
import MenteeSignupForm from 'components/MenteeSignupForm.jsx';
import MentorIntakeForm from 'components/MentorIntakeForm.jsx';
import MentorSignUpForm from 'components/MentorSignUpForm.jsx';
import MainNav from 'components/MainNav.jsx';
import UserProfile from 'components/UserProfile.jsx';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/" component={MainNav}>
      <Route path="/signup/mentee/:code" component={MenteeSignupForm}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/profile" component={UserProfile}/>
      <Route path="/intake/mentor" component={MentorIntakeForm}/>
      <Route path="/intake/mentee" component={MenteeIntakeForm}/>
      <Route path="/match" component={MatchList}/>
    </Route>
    <Route path="*"/>
  </Router>
), document.getElementById('js-main'))