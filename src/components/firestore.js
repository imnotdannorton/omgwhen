import firebase, { firestore } from 'firebase';

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FS_APIKEY,
    authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FS_DBURL,
    projectId: process.env.REACT_APP_FS_PROJECTID,
    storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FS_MESSAGE_SENDER_ID
};
firebase.initializeApp(config);

export default firestore;