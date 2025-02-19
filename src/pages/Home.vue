<template>
  <UserLayout>
    <v-container>
      <!-- Input Form -->
      <v-card class="pa-4 mb-4">
        <v-text-field
          v-model="newNote.title"
          label="Judul"
          variant="outlined"
        ></v-text-field>
        <v-textarea
          v-model="newNote.content"
          label="Catatan"
          variant="outlined"
        ></v-textarea>
        <v-btn color="primary" block @click="addNote">Tambah Catatan</v-btn>
      </v-card>

      <!-- Notes Grid -->
      <v-row>
        <v-col
          v-for="(note, index) in notes"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="note-card" :style="{ backgroundColor: note.color }">
            <v-card-title class="text-primary">{{ note.title }}</v-card-title>
            <v-card-text class="text-primary">{{ note.content }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                icon="mdi-delete"
                color="error"
                @click="deleteNote(index)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </UserLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useTheme } from "vuetify";

// Ambil warna dari Vuetify theme
const theme = useTheme();
const noteColors = [
  theme.current.value.colors.noteGreen,
  theme.current.value.colors.notePink,
  theme.current.value.colors.noteBlue,
  theme.current.value.colors.noteYellow,
  theme.current.value.colors.noteOrange,
];

// State untuk catatan
const notes = ref<{ title: string; content: string; color: string }[]>([]);
const newNote = ref({ title: "", content: "" });

// Fungsi menambahkan catatan
const addNote = () => {
  if (newNote.value.title.trim() || newNote.value.content.trim()) {
    const randomColor =
      noteColors[Math.floor(Math.random() * noteColors.length)];
    notes.value.push({ ...newNote.value, color: randomColor });
    newNote.value = { title: "", content: "" }; // Reset input
  }
};

// Fungsi menghapus catatan
const deleteNote = (index: number) => {
  notes.value.splice(index, 1);
};
</script>

<style scoped>
.note-card {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out;
}
.note-card:hover {
  transform: scale(1.02);
}
.text-primary {
  color: var(--v-theme-textPrimary) !important;
}
</style>
