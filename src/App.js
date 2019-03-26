import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  // set default state with example data
  // changing localDeliveries to null triggers the loading box
  state = {
    localDeliveries: [
      { name: "bob", checkins: 1 },
      { name: "ali", checkins: 3 },
      { name: "Amira", checkins: 8 }
    ]
  };

  // redefine react component class's componentDidMount
  // method with our fetch from the server
  componentDidMount = () => {
    fetch("https://api.decoded.com/checkin/amira-app")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

        // Transform the object we get from the server into an array:
        // https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
        let localDeliveries = [];
        for (var key in myJson) {
          if (myJson.hasOwnProperty(key)) {
            localDeliveries.push({ name: key, checkins: myJson[key] });
            // console.log(key + " -> " + myJson[key]);
          }
        }
        // console.log(localDeliveries)
        this.setState({
          localDeliveries: localDeliveries
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.localDeliveries && (
          <div>
            <p>Got some deliveries from server:</p>
            {this.state.localDeliveries.map(item => (
              <div>
                <p>{item.name}</p>
                <p>Number of checkins: {item.checkins}</p>
              </div>
            ))}
          </div>
        )}
        {!this.state.localDeliveries && <p>Loading deliveries</p>}
      </div>
    );
  }
}

export default App;
