import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import base from '../base'

import sampleFishes from '../sample-fishes'

class App extends Component {
  static propTypes = {
    match: PropTypes.object,
  }

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount () {
    const { storeID } = this.props.match.params

    // first reinstate our localStorage
    const localStorageReference = localStorage.getItem(storeID)
    //localStorageRef && this.setState({ order: JSON.parse(localStorageRef)});
    if (localStorageReference) {
      this.setState({ order: JSON.parse(localStorageReference)})
    }

    this.ref = base.syncState(`${storeID}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate () {
    const { storeID } = this.props.match.params
    const { order } = this.state

    localStorage.setItem(storeID, JSON.stringify(order))
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new fishes object to state
    this.setState({ fishes })
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }
    // 2. Update that state
    fishes[key] = updatedFish
    // 3. Set that to state
    this.setState({ fishes })
  }

  deleteFish = key => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes }
    // 2. Update that state
    fishes[key] = null
    // 3. Set that to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order }
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1
    // 3. Call setState to update our state object
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeID={this.props.match.params.storeID}
        />
      </div>
    )
  }
}

export default App