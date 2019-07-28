import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Order extends Component {
  render() {
    const {fishes, order} = this.props;
    const orderIDs = Object.keys(order);

    const total = orderIDs.reduce((tally, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = (fish && fish.status === 'available');

      if (!isAvailable) return tally;
      return tally + (count * fish.price);
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {orderIDs}
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;