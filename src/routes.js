import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Feed from './pages/Feed';
import New from './pages/ New';
import User from './pages/User';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/feed' component={Feed} />
                <Route path='/new' component={New} />
                <Route path='/user' component={User} />
            </Switch>
        </BrowserRouter>
    );
}