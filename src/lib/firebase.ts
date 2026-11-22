import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBsNYkAvhRT7D-tXV3efsYylZ_MyEHkRsQ',
  authDomain: 'iwamad-chat-43a8c.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-43a8c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-43a8c',
  storageBucket: 'iwamad-chat-43a8c.firebasestorage.app',
  messagingSenderId: '497436807740',
  appId: '1:497436807740:web:cc7b973cb6f4852c0a2939',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);