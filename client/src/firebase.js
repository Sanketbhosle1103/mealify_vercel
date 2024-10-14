// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7H-6YzHTQw5joEww7XnQzxBP2L50GcyE",
  authDomain: "travel-itinerary-98796.firebaseapp.com",
  projectId: "travel-itinerary-98796",
  storageBucket: "travel-itinerary-98796.appspot.com",
  messagingSenderId: "840025547218",
  appId: "1:840025547218:web:1bec7bf88d22b63920680b",
};

// REACT_APP_FIREBASE_API_KEY=AIzaSyB7H-6YzHTQw5joEww7XnQzxBP2L50GcyE
// REACT_APP_FIREBASE_AUTH_DOMAIN=travel-itinerary-98796.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=travel-itinerary-98796
// REACT_APP_FIREBASE_STORAGE_BUCKET=travel-itinerary-98796.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=840025547218
// REACT_APP_FIREBASE_APP_ID=1:840025547218:web:1bec7bf88d22b63920680b

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
