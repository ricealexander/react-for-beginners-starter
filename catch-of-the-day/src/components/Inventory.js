import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'

import base, { firebaseApp } from '../base'

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.authHandler(user)
    })
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeID,{
      context: this,
    })

    // 2. Claim it if there is no owner
    if (!store.owner) {
      // set it as our own
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid,
      })
    }

    // 3. Set state of inventory component to reflect the current user.
    this.setState({
      uid: authData.uid,
      owner: store.owner || authData.uid,
    })
  }

  authenticate = async provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    const auth = await firebaseApp.auth().signInWithPopup(authProvider)

    this.authHandler(auth)
  }

  logout = async () => {
    await firebaseApp.auth().signOut()
    this.setState({ uid: null })
  }

  render () {
    const { owner, uid } = this.state

    const isLoggedIn = uid != null
    const isOwner = isLoggedIn && (uid === owner)

    const logout = (
      <button onClick={this.logout}>Log Out!</button>
    )

    if (!isLoggedIn) {
      return <Login authenticate={this.authenticate} />
    }

    if (!isOwner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index = {key}
            fish={this.props.fishes[key]}
            deleteFish={this.props.deleteFish}
            updateFish={this.props.updateFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

export default Inventory