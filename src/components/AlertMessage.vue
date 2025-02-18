<template>
  <v-alert
    v-if="showAlert"
    :type="type"
    :color="alertColor"
    dismissible
    class="w-100"
  >
    <template v-slot:prepend>
      <v-icon v-if="type === 'error'">mdi-alert-circle</v-icon>
      <v-icon v-if="type === 'success'">mdi-check-circle</v-icon>
    </template>

    <!-- Menampilkan pesan sebagai list jika message adalah array -->
    <div v-if="Array.isArray(message)">
      <ul>
        <li v-for="(msg, index) in message" :key="index">{{ msg }}</li>
      </ul>
    </div>

    <!-- Menampilkan pesan jika bukan array -->
    <div v-else>
      {{ message }}
    </div>

    <!-- Progress Bar -->
    <v-progress-linear
      v-if="progress > 0"
      :model-value="progress"
      color="grey-lighten-2"
      height="10"
      class="mt-2"
      striped
      rounded
    />
  </v-alert>
</template>

<script lang="ts" setup>
import {
  defineProps,
  computed,
  ref,
  onMounted,
  watch,
  type PropType,
} from "vue";

const props = defineProps({
  message: {
    type: [String, Array] as PropType<string | string[]>,
    required: true,
  },
  type: {
    type: String as () => "success" | "error" | "info" | "warning",
    default: "success",
  },
  duration: {
    type: Number,
    default: 5000, // Durasi dalam milidetik (default 5 detik)
  },
});

const showAlert = ref(true);
const progress = ref(0);

// Warna berdasarkan tipe alert
const alertColor = computed(() => {
  return props.type === "error" ? "red" : "green";
});

// Menyembunyikan alert setelah durasi
const startAutoHide = () => {
  progress.value = 0;
  showAlert.value = true;

  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += (100 / props.duration) * 100;
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    showAlert.value = false;
  }, props.duration);
};

// Menggunakan watch untuk mendeteksi perubahan pada message
watch(
  () => props.message,
  () => {
    startAutoHide();
  }
);

// Menjalankan fungsi saat komponen dimuat pertama kali
onMounted(() => {
  startAutoHide();
});
</script>
