<template lang="">
  <v-container fuild>
    <v-card
      class="w-25 mt-4"
      :prepend-avatar="getAvatarUrl(contact.picture)"
      :title="contact.name"
      :subtitle="contact.contact"
      :text="contact.email"
    >
      <template #title> {{ contact.name }} (#{{ contact.id }}) </template>
      <v-card-actions>
        <v-btn color="info" :to="{ name: 'contact.edit', params: { id: contact.id } }">
          Edit
        </v-btn>
        <v-btn color="error" @click="dialog = true"> Delete </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card color="primary" title="Are you sure you want to delete this item?">
        <v-card-actions>
          <v-btn @click="remove()"> Yes </v-btn>
          <v-btn @click="dialog = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useContact } from '../composables/contacts'

const props = defineProps({
  id: {
    type: String
  }
})

const { getContact, contact, destroyContact, getAvatarUrl } = useContact()
const dialog = ref(false)

function remove() {
  destroyContact(props.id)
  dialog.value = false
}

onMounted(() => {
  getContact(props.id)
})
</script>
<style lang=""></style>
