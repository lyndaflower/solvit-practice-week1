import "./App.css";

import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      value: "",
      inputSearch: "",
      temp: { list: [] }
    };
  }

  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=kigali&appid=1383c1ef39cccbbc106d269850cfc481"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ temp: data, isLoading: false, inputSearch: "" });
      });
  }

  handlerEventInput = e => {
    const inputSearch = e.target.value;
    this.setState({ inputSearch });
  };

  render() {
    const { inputSearch } = this.state;

    const searchInputDisplay = this.state.temp.list.filter(data => {
      return data.weather[0].description
        .toLowerCase()
        .includes(inputSearch.toLowerCase());
    });

    return this.state.isLoading
      ? <h1 className="loading"></h1>
      : <div className="app-container">
        <div className="search-input">
        <h1>Search section</h1>
          <input type="search" onChange={this.handlerEventInput} />
        </div>

          <div className="output-section">
            <h1>search out-put</h1>
            {searchInputDisplay.map(list => {
              return (
                <p key={list.dt}>
                  {list.weather[0].description.toLowerCase()}
                </p>
              );
            })}
          </div>
        </div>;
  }
}

export default App;
