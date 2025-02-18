// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

const myTheme = {
  dark: false, // Set ke true jika ingin dark mode
  colors: {
    primary: '#FBBC04',   // Yellow (Main)
    secondary: '#4285F4', // Blue (Accent)
    error: '#EA4335',     // Red (Error)
    success: '#34A853',   // Green (Success)
    background: '#FFFFFF', // White Background
    surface: '#F1F3F4',    // Light Gray Surface
    noteGreen: '#E6F4EA',
    notePink: '#FCE8E6',
    noteBlue: '#E8F0FE',
    noteYellow: '#FEF7E0',
    noteOrange: '#FDE7E3',
    textPrimary: '#3C4043',  // Dark Gray Text
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
