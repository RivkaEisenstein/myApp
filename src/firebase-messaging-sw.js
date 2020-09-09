importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCfBxKJ2NcMDLmcfm1CWLZT1co2oPsQd8w",
    authDomain: "notification-sample-60997.firebaseapp.com",
    databaseURL: "https://notification-sample-60997.firebaseio.com",
    projectId: "notification-sample-60997",
    storageBucket: "notification-sample-60997.appspot.com",
    messagingSenderId: "352845393273",
    appId: "1:352845393273:web:c975be7d3c8e853297d3a8",
    measurementId: "G-67FMRMR52G"

});

const messaging = firebase.messaging();
