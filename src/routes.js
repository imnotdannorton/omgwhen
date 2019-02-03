import React from 'react';
import { Countdown } from './components/Countdown';
import { Create } from './components/Create';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Create} />
                <Route path="/until/:countId" component={Countdown}/>
            </Switch>
        </div>
    );
};