import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAyn1F4U-3CQi-QukhS1-avZu8THEZv9qc',
  authDomain: 'pokedex-44c1e.firebaseapp.com',
  projectId: 'pokedex-44c1e',
  storageBucket: 'pokedex-44c1e.firebasestorage.app',
  messagingSenderId: '688330587548',
  appId: '1:688330587548:web:02f79f222b56b6bd4b9c59',
  measurementId: 'G-R8TXHNQE6N'
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export type Collection = 'pokemons' | 'users';
export const database = getFirestore(app);
