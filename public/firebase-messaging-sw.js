// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCFZFIdl1qTKo9hrWwYXc_2T8Cj98YgrmA",
    authDomain: "h3lth-18b24.firebaseapp.com",
    projectId: "h3lth-18b24",
    storageBucket: "h3lth-18b24.firebasestorage.app",
    messagingSenderId: "1086454241381",
    appId: "1:1086454241381:web:4d3c00d9915dd1dac3ce8c",
    measurementId: "G-VCM2CENCLS"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    alert("....")
    // Customize notification here
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
        body: payload?.notification?.body,
        icon: payload?.notification?.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});