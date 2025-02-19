import { auth, provider } from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { saveUserToFirestore } from "./userService";
import router from "@/router";

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await saveUserToFirestore(result.user);
    }

    router.push("/home");
  } catch (error) {
    console.error("Error saat login:", error);
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    console.log(email, password);
    // Daftar pengguna dengan email dan password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user: User = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    // Simpan data pengguna ke Firestore
    await saveUserToFirestore(user);

    router.replace("/");
  } catch (error) {
    console.error("Error saat registrasi:", error);
  }
};
