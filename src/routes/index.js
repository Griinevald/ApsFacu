import React from 'react';

import Login from '../pages/login'
import Home from '../pages/home'
import Error from '../pages/erro'
import Chat from '../pages/chat'
import About from '../pages/about'
import Route from './routes'

import { BrowserRouter, Switch } from 'react-router-dom'

function Routes() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route component={Login} path="/login" />
                    <Route component={Home} path="/home" isPrivate />
                    <Route component={Home} path="/" exact isPrivate />
                    <Route component={Chat} path="/chat" isPrivate />
                    <Route component={About} path="/about" isPrivate />
                    <Route component={Error} path="*" isPrivate />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Routes;