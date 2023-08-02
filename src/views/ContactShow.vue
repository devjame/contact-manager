<template lang="">
  <v-container fuild>
    <v-card
      class="w-50 mt-4"
      :prepend-avatar="contact.picture"
      :title="contact.name"
      :subtitle="contact.contact"
      :text="contact.email"
    >
      <v-card-actions>
        <v-btn color="info" :to="{ name: 'contact.edit', params: { id: contact.id } }">
          Edit
        </v-btn>
        <v-btn color="error" @click="openDialog(contact.id)"> Delete </v-btn>
      </v-card-actions>
    </v-card>
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

const currentContact = ref()

const { contacts } = useContact()

function getContact(id) {
  currentContact.value = contacts.value.filter((item) => {
    item.id === id
  })
}

onMounted(() => {
  getContact(props.id)
})
</script>
<style lang=""></style>
