import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxZrXAX31GOe-H5D2GaObuLmdFclbLujQ",
  authDomain: "catchoftheday-ricealexander.firebaseapp.com",
  databaseURL: "https://catchoftheday-ricealexander.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
