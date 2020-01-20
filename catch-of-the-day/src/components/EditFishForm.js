import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends Component {
  static propTypes = {
    index: PropTypes.string,
    fish: PropTypes.shape({
      desc: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
    }),
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
  }

  handleChange = event => {
    const { name, value } = event.currentTarget
    const { index, fish, updateFish } = this.props

    // update that fish
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...fish,
      [name]: value,
    }
    updateFish(index, updatedFish)
  }

  render () {
    const { desc, image, name, price, status } = this.props.fish
    const isAvailable = (status === 'available')

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={price}
        />
        <select type="text" name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          onChange={this.handleChange}
          value={desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm