import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export const appId = typeof __app_id !== 'undefined' ? __app_id : 'monkeytype-squad-streak-v4';

const myFirebaseConfig = {
    apiKey: "AIzaSyAjYIUxT2IdfapDmx30Cofu7tEpci_LF8I",
    authDomain: "monkeytype-2721.firebaseapp.com",
    projectId: "monkeytype-2721",
    storageBucket: "monkeytype-2721.firebasestorage.app",
    messagingSenderId: "971929388492",
    appId: "1:971929388492:web:48994f5a6a7c5251648969"
};

let firebaseConfig = Object.keys(myFirebaseConfig).length > 0 ? myFirebaseConfig : {};
if (typeof __firebase_config !== 'undefined' && Object.keys(firebaseConfig).length === 0) {
    try {
        firebaseConfig = JSON.parse(__firebase_config);
    } catch (e) {
        console.warn('Firebase config not available, running offline.', e);
    }
}

export let app = null;
export let db = null;
export let auth = null;
export let isOffline = false;

try {
    if (!firebaseConfig.apiKey) throw new Error('No Firebase Config supplied');
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} catch (e) {
    isOffline = true;
    console.warn('Firebase initialization failed, app is running in offline mode.', e);
}
export { collection, addDoc, getDocs };
