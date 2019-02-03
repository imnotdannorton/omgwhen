import firebase, { firestore } from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2pAD1YepSVCF274vwxlZYLehAx10t0Lw",
    authDomain: "omgwhen-61f63.firebaseapp.com",
    databaseURL: "https://omgwhen-61f63.firebaseio.com",
    projectId: "omgwhen-61f63",
    storageBucket: "omgwhen-61f63.appspot.com",
    messagingSenderId: "78642671620"
  };
  firebase.initializeApp(config);

export default firestore;