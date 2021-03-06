import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'

class Fish extends Component {
  static propTypes = {
    addToOrder: PropTypes.func,
    details: PropTypes.shape({
      desc: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
    }),
    index: PropTypes.string,
  }

  handleClick = () => {
    this.props.addToOrder(this.props.index)
  }

  render () {
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = (status === 'available')
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? 'Add To Order' : 'Sold Out'}
        </button>
      </li>
    )
  }
}

export default Fish