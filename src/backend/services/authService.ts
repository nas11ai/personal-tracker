import { auth, provider } from "../configs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { saveUserToFirestore } from "./userService";

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await saveUserToFirestore(result.user);
    }
    return result.user;
  } catch (error) {
    console.error("Error saat login:", error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error saat logout:", error);
  }
};
