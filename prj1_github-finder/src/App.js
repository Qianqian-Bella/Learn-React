import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false, // if data has been fetched
    alert: null,
  };

  // invoked immediately after a component is mounted (inserted into the tree)
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.React_REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.React_REACT_APP_GITHUB_CLIENT_SECRET}` // access environment variable
    );
    this.setState({ users: res.data, loading: false });
  }

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.React_REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.React_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data);
    // console.log(res.data.items);
    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github users
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.React_REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.React_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.React_REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.React_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = async () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alert
  setAlert = async (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { loading, users, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          {/* will overwrite the default props in Navbar.js */}
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            {/* Renders the first child <Route> or <Redirect> that matches the location. */}
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
