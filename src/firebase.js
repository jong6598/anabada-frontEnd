import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA_BTQPOGYRE2Wf7SLMn8byLzbpFZ0tIBA",
  authDomain: "ana-bada-dfe53.firebaseapp.com",
  projectId: "ana-bada-dfe53",
  storageBucket: "ana-bada-dfe53.appspot.com",
  messagingSenderId: "41926212611",
  appId: "1:41926212611:web:4c86ee2f59494bdc48a236",
  measurementId: "G-4DRJG76TQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;