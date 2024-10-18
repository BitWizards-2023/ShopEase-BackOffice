// src/conf/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

/**
 * Retrieve FCM Token
 * @param {string} vapidKey - Public VAPID key obtained from Firebase Console
 * @returns {Promise<string|null>} - Returns the FCM token or null if not available
 */
/**
 * Retrieve FCM Token
 * @returns {Promise<string|null>} - Returns the FCM token or null if not available
 */
export const retrieveFCMToken = async () => {
  try {
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      throw new Error(
        "VAPID Key is not defined. Please set VITE_FIREBASE_VAPID_KEY in your environment variables."
      );
    }

    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      console.log("FCM Token retrieved:", currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving FCM token:", error);
    return null;
  }
};

/**
 * Handle Incoming Foreground Messages
 * @param {function} callback - Function to handle the payload of the incoming message
 */
export const handleIncomingMessages = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    callback(payload);
  });
};

/**
 * Handle Token Refresh
 * Note: Firebase SDK v9 automatically handles token refresh.
 * This function provides a mechanism to perform actions when a token is refreshed.
 * @param {string} vapidKey - Public VAPID key obtained from Firebase Console
 * @param {function} callback - Function to handle the new token
 */
export const handleTokenRefresh = (vapidKey, callback) => {
  // Since onTokenRefresh is deprecated in Firebase SDK v9,
  // implement a periodic token retrieval as a workaround.

  // Example: Retrieve and update token every hour
  setInterval(async () => {
    const newToken = await retrieveFCMToken(vapidKey);
    if (newToken) {
      callback(newToken);
    }
  }, 60 * 60 * 1000); // Every hour
};

// Export the initialized instances and functions
export { app, messaging, onMessage };
