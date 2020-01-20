import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatPrice } from '../helpers'

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  }

  renderOrder = key => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = (fish && fish.status === 'available')
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    }

    // make sure the fish has loaded before we continue!
    if (!fish) return null

    if (!isAvailable) {
      return (
        <CSSTransition { ...transitionOptions }>
          <li key={key}>
          Sorry, {fish.name || 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition { ...transitionOptions }>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={()=> this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    )
  };

  render () {
    const orderIDs = Object.keys(this.props.order)

    const total = orderIDs.reduce((tally, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = (fish && fish.status === 'available')

      if (!isAvailable) return tally
      return tally + (count * fish.price)
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIDs.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order