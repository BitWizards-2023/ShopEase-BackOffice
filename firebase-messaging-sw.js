// public/firebase-messaging-sw.js
/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1h8pxJsKW6KNvKDSmTWS6o9-UyXWVltg",
  authDomain: "shopease-eaaa6.firebaseapp.com",
  projectId: "shopease-eaaa6",
  storageBucket: "shopease-eaaa6.appspot.com",
  messagingSenderId: "669626797007",
  appId: "1:669626797007:web:7d7259d5e65547bfa6a0ba",
  measurementId: "G-BQDPWPGNQR",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
    icon: "/firebase-logo.png",
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Send message to the main thread
  self.clients
    .matchAll({ includeUncontrolled: true, type: "window" })
    .then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "NEW_NOTIFICATION",
          payload: {
            id: payload.messageId || new Date().getTime(),
            title: payload.notification.title,
            body: payload.notification.body,
            data: payload.data || {},
            receivedAt: new Date().toISOString(),
            read: false,
          },
        });
      });
    });
});
