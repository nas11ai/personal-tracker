<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <AlertMessage :is-shown="showAlert" @update:is-shown="showAlert = $event" :message="errorMessages" type="error"
    class="alert-message" />

  <v-container fluid class="d-flex pa-0">
    <!-- Bagian Kiri (Gambar) -->
    <v-container class="d-none d-sm-flex align-center justify-center bg-primary h-screen w-50">
      <v-img :src="landingPageImage" alt="Login Image" contain max-height="500" />
    </v-container>

    <!-- Bagian Kanan (Form Register) -->
    <v-container class="d-flex align-center justify-center bg-surface h-screen w-100 sm-w-50">
      <v-card class="pa-6 bg-white" width="400">
        <v-card-title class="text-center my-4"> Daftar Akun </v-card-title>
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field v-model="name" label="Name" required type="text" />
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Password" type="password" required />

            <v-btn type="submit" block color="primary" @click="register">
              Daftar
            </v-btn>
          </v-form>

          <div class="text-center mt-4">
            <span> Sudah punya akun? </span>
            <router-link to="/" class="text-primary" @click="overlay = !overlay">
              Masuk
            </router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { registerUser } from "@/backend/services/authService";
import landingPageImage from "@/assets/landing_page.svg";
import { registerRequest, type RegisterForm } from "@/requests/registerRequest";
import { z } from "zod";
import AlertMessage from "@/components/AlertMessage.vue";

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const overlay = ref(false);
const errorMessages = ref<string[]>([]);
const showAlert = ref(false);

// Watch untuk memastikan AlertMessage selalu muncul saat ada error baru
watch(errorMessages, (newErrors) => {
  showAlert.value = newErrors.length > 0;
});

const register = async (): Promise<void> => {
  try {
    overlay.value = true;
    const formData: RegisterForm = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    // Reset errorMessages sebelum validasi
    errorMessages.value = []; // Akan otomatis memicu watch di atas
    registerRequest.parse(formData);

    await registerUser(name.value, email.value, password.value);
  } catch (error) {
    overlay.value = false;

    if (error instanceof z.ZodError) {
      errorMessages.value = error.errors.map((err) => err.message);
    } else {
      console.error("Error saat registrasi:", error);
      errorMessages.value = ["Terjadi kesalahan saat registrasi."];
    }
  }
};
</script>

<style scoped>
/* Posisi fixed untuk alert message di atas */
.alert-message {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* Pastikan berada di atas elemen lainnya */
}
</style>
