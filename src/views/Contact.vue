<template lang="">
  <v-container fuild>
    <v-row class="mt-4">
      <v-card class="w-50 pa-2">
        <v-card-title v-if="route.name !== 'contact.edit'">New Contact</v-card-title>
        <v-card-title v-else>Edit Contact </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="contactForm.name"
              :rules="contactForm.nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="contactForm.contact"
              :rules="contactForm.contactRules"
              label="Phone Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="contactForm.email"
              :rules="contactForm.emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-file-input
              prepend-icon="mdi-camera"
              v-model="contactForm.picture"
              :rules="contactForm.pictureRules"
              accept="image/*"
              label="Picture"
              required
            ></v-file-input>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContact } from '../composables/contacts'

const props = defineProps({
  id: {
    type: String
  }
})

const route = useRoute()
const router = useRouter()
const currentContact = ref()

const { storeContact, contacts } = useContact()

function getContact(id) {
  currentContact.value = contacts.value.filter((item) => {
    item.id === id
  })
}

onMounted(() => {
  getContact(props.id)
})

const contactForm = ref({
  name: currentContact.value?.name ?? '',
  nameRules: [
    (value) => {
      if (value?.length > 5) return true

      return 'First name must be at least 5 characters.'
    }
  ],
  email: currentContact.value?.email ?? '',
  emailRules: [
    (value) => {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid email.'
    }
  ],
  contact: currentContact.value?.contact ?? '',
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
  storeContact({
    name: contactForm.value.name,
    email: contactForm.value.email,
    contact: contactForm.value.contact,
    picture: 'https://avatars.githubusercontent.com/u/66961990'
  })

  router.push({ name: 'home' })
}
</script>
<style lang=""></style>
