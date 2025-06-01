import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
    return auth.signOut();
};

export const getCurrentUser = () => {
    return auth.currentUser;
};