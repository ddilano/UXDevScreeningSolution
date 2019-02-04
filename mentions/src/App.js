import React, { Component } from 'react';
import './App.css';

// This function mocks a simple synchronous API to fetch the label list by keyword.
// Example:
//  const val = getLabels('C');
//  console.log(val);
function getLabels(keyword) {
	const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
  const result = allLabels
    .filter(function(x) {
      return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  return result;
}

// This function mocks the asynchronous API to fetch the label list by keyword.
// Example:
//  getLabelsAsync('C').then(function(val) {
//     console.log(val);
//  })
function getLabelsAsync(keyword) {
	const result = getLabels(keyword);
  const delay = Math.random() * 800 + 200; // delay 200~1000ms
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay, result);
  });
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      suggestions: []
    };
    this.showSuggestions = this.showSuggestions.bind(this);
    this.addToInputOnClick = this.addToInputOnClick.bind(this);
  }

  async showSuggestions(e) {
    const val = e.target.value;
    const newState = { text: val };
    this.setState(newState);
    const index = val.indexOf('@');
    if (index >= 0) {
      const query = val.substring(index + 1);
      const suggestions = await getLabelsAsync(query)
      this.setState({suggestions});
    }
  }

  addToInputOnClick(e) {
    const newState = {suggestions: []};
    const {text} = this.state;
    const content = e.target.textContent;
    const index = text.indexOf('@');
    newState.text = text.substring(0, index) + content;
    this.setState(newState);
  }

  render() {
    const { suggestions, text } = this.state;
    return (
      <div>
        <input type='text' onChange={this.showSuggestions} value={text} />
        <ul>
          {suggestions.map((s) => <li className='suggestion' key={s} value={s} onClick={this.addToInputOnClick}> &#129078; {s}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
