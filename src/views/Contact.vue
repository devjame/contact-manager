<template lang="">
  <v-container fuild>
    <v-row class="mt-4">
      <v-card class="w-50 pa-2">
        <v-card-title>New Contact </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="contact.name"
              :rules="contact.nameRules"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="contact.contact"
              :rules="contact.contactRules"
              label="Phone Number"
            ></v-text-field>
            <v-text-field
              v-model="contact.email"
              :rules="contact.emailRules"
              label="Email"
            ></v-text-field>
            <v-file-input
              prepend-icon="mdi-camera"
              v-model="contact.picture"
              :rules="contact.pictureRules"
              accept="image/*"
              label="Picture"
            ></v-file-input>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'

const contact = ref({
  name: '',
  nameRules: [
    (value) => {
      if (value?.length > 5) return true

      return 'First name must be at least 5 characters.'
    }
  ],
  email: '',
  emailRules: [
    (value) => {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid email.'
    }
  ],
  contact: '',
  contactRules: [
    (value) => {
      if (value?.length === 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    }
  ],
  picture: [],
  pictureRules: [
    (value) => {
      if (value) return true

      return 'Select an picture.'
    }
  ]
})

function submit() {
  console.log(contact.value)
}
</script>
<style lang=""></style>
