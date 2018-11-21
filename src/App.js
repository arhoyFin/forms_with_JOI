import React, { Component } from 'react';
import './App.css';

import SignUp from  './components/SignUp/SignUp';
import AddEditMovie from  './components/AddEditMovie/AddEditMovie';
import Home from  './components/Home/Home';
import Movies from  './components/Movies/Movies';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
        <Layout>
          <Switch>
            <Route exact path = "/movie/new" component = {AddEditMovie} />
            <Route  path = "/movie/:id" component = {AddEditMovie} />
            <Route  path = "/signup" component = {SignUp} />
            <Route  path = "/movies" component = {Movies} />
            <Route exact path = "/" component = {Home} />
          </Switch>
        </Layout>
    
    );
  }
}

export default App;
