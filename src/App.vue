<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <v-app-bar density="compact">
      <v-app-bar-title>
        <router-link to="/">Contact Manager</router-link>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn v-if="$route.name === 'home'" :to="{ name: 'contact.create' }">New Contact</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
