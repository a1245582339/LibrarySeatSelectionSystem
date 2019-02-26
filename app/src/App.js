import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Views from './views'

class App extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact
                    from="/"
                    to="/main/home"
                />
                <Route component={Views.Main}
                    path="/main"
                />
                <Route component={Views.Login}
                    path="/login"
                />
                <Route component={Views.NoPermission}
                    path="/401"
                />
                <Route component={Views.NoFound} />
            </Switch>
        );
    }
}

export default App;
