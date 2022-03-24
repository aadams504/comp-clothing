import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
 } from 'firebase/firestore'


// Firebase config for clothing web app

const firebaseConfig = {
  apiKey: "AIzaSyDE9I2z4ocBHNLdVyNtPr9Ksp_Mivm5BWI",
  authDomain: "comp-clothing-db.firebaseapp.com",
  projectId: "comp-clothing-db",
  storageBucket: "comp-clothing-db.appspot.com",
  messagingSenderId: "140112381987",
  appId: "1:140112381987:web:1b3a8a990c91c12cb0c996"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google specific auth provider config
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

// Checks for existing user data on db and allows access to data
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    // Check if user data exists
    if(!userSnapshot.exists())  {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
            catch (error) {
                console.log('error creating user', error.message)
            }
        }
    
    // !userData then set document with data from userAuth in my collection

    // return userDocReference
}