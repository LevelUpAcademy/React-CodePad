import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Home } from "./home";
import { New } from "./new";
import { Code } from "./code";

export class Main extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/new' component={New}/>
                {/* both /roster and /roster/:number begin with /roster */}
                <Route path='/:code' component={Code}/>
            </Switch>
        );
    }
}