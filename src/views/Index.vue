<template>
  <v-container fluid>
    <div class="my-4 d-flex">
      <h2 class="text-h4 text-md-h3 text-lg-h2">Contacts</h2>
    </div>
    <v-divider class="mb-4 w-25"></v-divider>
    <v-row>
      <v-col v-for="contact in contacts" :key="contact.id" cols="4">
        <v-card
          :prepend-avatar="getAvatarUrl(contact.picture)"
          :subtitle="contact.contact"
          :text="contact.email"
        >
          <template #title>
            <router-link :to="{ name: 'contact.show', params: { id: contact.id } }">
              {{ contact.name }}
            </router-link>
          </template>
          <v-card-actions>
            <v-btn color="info" :to="{ name: 'contact.edit', params: { id: contact.id } }">
              Edit
            </v-btn>
            <v-btn color="error" @click="openDialog(contact.id)"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
        <v-card color="primary" title="Are you sure you want to delete this item?">
          <v-card-actions>
            <v-btn @click="remove()"> Yes </v-btn>
            <v-btn @click="dialog = false"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { useContact } from '../composables/contacts'

const { contacts, destroyContact, getAvatarUrl } = useContact()

const dialog = ref(false)
const contactId = ref()

function openDialog(id) {
  dialog.value = true
  contactId.value = id
}

function remove() {
  destroyContact(contactId.value)
  dialog.value = false
}
</script>
