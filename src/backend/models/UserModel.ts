// src/models/UserModel.ts
import { Timestamp } from "firebase/firestore";

export interface UserModel {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
