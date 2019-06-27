import React, { Component } from 'react';
import TitleBar from './components/title-bar';
import ModuleTab from './components/module-tab';

const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
      <div className="app">
        <TitleBar/>
        <ModuleTab/>
        <p className="app-intro">
          <b> Release 0.2.7 </b>
          Version: {app.getVersion()}
        </p>
      </div>
    );
  }
}

export default App;
