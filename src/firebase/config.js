import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD0T3Ca32cJcagij3fqCfyEzUx5xb3bf_k",
  authDomain: "codepad-ab429.firebaseapp.com",
  databaseURL: "https://codepad-ab429.firebaseio.com",
  projectId: "codepad-ab429",
  storageBucket: "codepad-ab429.appspot.com",
  messagingSenderId: "241833495901"
};

var fire = firebase.initializeApp(config);
export default fire;