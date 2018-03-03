import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Header } from "./components/header";
import { Main } from "./components/main";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={'container'}>
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
