import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp({
    apiKey: 'AIzaSyBWaR7GFC6DeBbVOVSCqWaDMeYnxpd_w_s',
    authDomain: 'nutricheck-app.firebaseapp.com',
    projectId: 'nutricheck-app',
    storageBucket: 'nutricheck-app.appspot.com',
    messagingSenderId: '340022963347',
    appId: '1:340022963347:web:d981a75d8d74d63c237166',
});

export const googleOauthPopup = async () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user.getIdToken();
        // ...
    } catch (error) {
        console.log(error);
    }
};
