import { db } from "../configs/firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import type { UserModel } from "../models/UserModel";

export const saveUserToFirestore = async (user: User): Promise<void> => {
  try {
    const userRef = doc(db, "users", user.uid);

    const userData: UserModel = {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      throw new Error("Pengguna dengan UID tersebut sudah ada.");
    }

    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error saat menyimpan data pengguna:", error);
  }
};
