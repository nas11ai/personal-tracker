<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
  <v-container fluid class="d-flex pa-0">
    <!-- Bagian Kiri (Gambar) -->
    <v-container
      class="d-none d-sm-flex align-center justify-center bg-primary h-screen w-50"
    >
      <v-img
        :src="landingPageImage"
        alt="Login Image"
        contain
        max-height="500"
      />
    </v-container>

    <!-- Bagian Kanan (Form Login) -->
    <v-container
      class="d-flex align-center justify-center bg-surface h-screen w-100 sm-w-50"
    >
      <v-card class="pa-6 bg-white" width="400">
        <v-card-title class="text-center my-4"> Selamat Datang </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            />
            <v-btn type="submit" block color="primary"> Login </v-btn>
          </v-form>
          <v-divider class="my-8"> atau </v-divider>
          <v-btn block color="secondary" @click="googleLogin">
            <span class="flex-grow-1 text-center">Login dengan Google</span>
          </v-btn>
          <v-container class="text-center">
            Belum punya akun?
            <router-link
              to="/auth/register"
              class="text-primary"
              @click="overlay = !overlay"
            >
              Daftar disini
            </router-link>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { signInWithGoogle } from "@/backend/services/authService";
import landingPageImage from "@/assets/landing_page.svg";

const email = ref("");
const password = ref("");
const overlay = ref(false);

const googleLogin = async (): Promise<void> => {
  try {
    overlay.value = true;
    await signInWithGoogle();
  } catch (error) {
    overlay.value = false;
    console.error("Error saat login:", error);
  }
};
</script>
