import React, { Component } from 'react';
import './App.css';
import Form from './form.js';
import R, { head, groupBy} from "ramda";
import MyPlacemark from './map.js'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapValue:null
    }
  }
  updateData = (value) => {
   this.setState({ mapValue: value });
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My App</h1>
        </header>
        <Form updateData={this.updateData}/>
        <div className='map'>
          <MyPlacemark cities={this.state.mapValue} />
        </div>
      </div>
    );
  }
}

export default App;
