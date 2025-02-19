<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar color="primary">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Personal Tracker</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Sidebar -->
        <v-navigation-drawer v-model="drawer" :temporary="isMobile">
            <v-list density="compact">
                <v-list-item v-for="item in items" :key="item.value" @click="navigate(item.value)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Main Content -->
        <v-main>
            <div class="d-flex flex-column w-100 h-screen px-16 py-8 bg-surface">
                <slot></slot>
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

// State untuk sidebar
const drawer = ref<boolean>(false);

// Data menu
const items = ref<{ title: string; value: string }[]>([
    { title: "Home", value: "/" },
    { title: "About", value: "/about" },
    { title: "Contact", value: "/contact" },
]);

// Router instance
const router = useRouter();

// Fungsi navigasi
const navigate = (route: string) => {
    router.push(route);
    drawer.value = false;
};

// Cek ukuran layar dari Vuetify
const { mdAndUp, mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
</script>
