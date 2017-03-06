import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import NotificationSystem from 'react-notification-system';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import UserProfile from 'components/UserProfile.jsx';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loading: true,
      loggedIn: false,
    };
    this._notificationSystem = null;
  }

  static childContextTypes = {
    loggedIn: React.PropTypes.bool,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
    this.isLoggedIn();
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.location.pathname !== '/login'){
      this.isLoggedIn();
    }
  }

  getChildContext() {
    return { loggedIn: this.state.loggedIn }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    this.setState({ loading: true });
    axios.post('/api/v1/auth/logout').then((res) => {
      this._notificationSystem.addNotification({
        title: 'You have logged out!',
        level: 'success',
        position: 'tc'
      });
      this.setState({ loggedIn: false });
      this.setState({ loading: false });
    }).catch(e => {
      this._notificationSystem.addNotification({
        title: 'An errored occured!',
        level: 'error',
        position: 'tc'
      });
      this.setState({ loading: false });
      console.error(e)
    });
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) return true;
    console.log('check!');
    this.setState({ loading: true });
    axios.get('/api/v1/auth').then((res) => {
      if (!res.authenticated) {
      //if (!res){
        this.context.router.push('/login');
      } else {
        this.state.loggedIn = true;
      }
      this.setState({ loading: false });
    }).catch(e => {
      this._notificationSystem.addNotification({
        title: 'An errored occured!',
        level: 'error',
        position: 'tc'
      });
      this.setState({ loading: false });
      console.error(e)
    });
  };

  render() {
    return (
      <div>
        <NotificationSystem ref={n => this._notificationSystem = n} />
        <Navbar color="faded" light toggleable>
          <div className="container">
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand href="http://www.raphaelhouse.org/">
              <img style={{height: 75}} src="client/img/rhlogo.png"/>
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </NavItem>
                {this.state.loggedIn && <NavItem>
                  <NavLink className="pointer" onClick={this.handleLogout.bind(this)}>
                    Log out
                  </NavLink>
                </NavItem>}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        {!this.state.loading && (this.props.children || <UserProfile/>)}
      </div>
    );
  }
}