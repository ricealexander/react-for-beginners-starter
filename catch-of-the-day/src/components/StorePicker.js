import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  myInput = React.createRef();

  goToStore = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    console.log(this);
    // 3. Change the page to /store/whatever-they-entered
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref="this.myInput"
          placeholder="Store Name"
          defaultValue={getFunName()}
          required
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;