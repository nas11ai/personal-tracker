<template>
  <v-container class="d-flex flex-column align-center justify-center h-screen">
    <v-card class="pa-6 w-50">
      <v-card-title class="text-center">Login dengan Google</v-card-title>
      <v-card-text v-if="user">
        <p>Halo, {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <v-img v-if="user.photoURL" :src="user.photoURL" alt="Profile" width="100" class="rounded-circle"></v-img>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn v-if="!user" @click="login" color="primary">Login dengan Google</v-btn>
        <v-btn v-else @click="logoutUser" color="error">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { signInWithGoogle, logout, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { UserModel } from "@/models/UserModel";

const user = ref<UserModel | null>(null);

const fetchUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    user.value = docSnap.data() as UserModel;
  }
};

const login = async () => {
  const loggedInUser = await signInWithGoogle();
  if (loggedInUser) {
    await fetchUserData(loggedInUser.uid);
  }
};

const logoutUser = async () => {
  await logout();
  user.value = null;
};
</script>
