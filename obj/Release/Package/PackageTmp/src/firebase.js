import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAjbEqFzKBsAkIlAIpoASIjawtv85Z0trw",
    authDomain: "diet-6be73.firebaseapp.com",
    databaseURL: "https://diet-6be73.firebaseio.com",
    projectId: "diet-6be73",
    storageBucket: "diet-6be73.appspot.com",
    messagingSenderId: "755813466643"
};

firebase.initializeApp(config);

export default firebase;