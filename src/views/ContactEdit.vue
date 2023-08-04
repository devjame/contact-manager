<template lang="">
  <v-container fuild>
    <v-row class="mt-4">
      <v-card class="w-50 pa-4">
        <v-card-title>Edit Contact</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" ref="formRef">
            <v-text-field
              v-model="contact.name"
              :rules="rules.nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.contact"
              :rules="rules.contactRules"
              label="Phone Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.email"
              :rules="rules.emailRules"
              label="Email"
              required
            ></v-text-field>
            <div class="d-flex">
              <v-avatar :image="getAvatarUrl(contact.picture)" size="large"> </v-avatar>
              <v-file-input
                :rules="rules.filesRules"
                accept="image/*"
                label="Picture"
                @change="uploadImage"
                required
              ></v-file-input>
            </div>
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

const formRef = ref()

const route = useRoute()
const router = useRouter()

const { updateContact, getContact, contact, uploadAvatar, getAvatarUrl } = useContact()

const rules = {
  nameRules: [
    (value) => {
      if (value?.length > 5) return true

      return 'First name must be at least 5 characters.'
    }
  ],
  emailRules: [
    (value) => {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid email.'
    }
  ],
  contactRules: [
    (value) => {
      if (value?.length === 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    }
  ],
  pictureRules: [
    (value) => {
      if (value) return true

      return 'Select an picture.'
    }
  ]
}

const uploadImage = async (evt) => {
  const file = evt.target.files[0]
  const fileExt = file.name.split('.').pop()
  const filePath = `${Math.random()}.${fileExt}`
  let { error: uploadError } = uploadAvatar(filePath, file)
  contact.value.picture = filePath
}

function submit() {
  if (formRef.value.isValid) {
    updateContact({
      name: contact.value.name,
      email: contact.value.email,
      contact: contact.value.contact,
      picture: contact.value.picture
    })
  }

  router.push({ name: 'home' })
}

onMounted(() => {
  if (route.name === 'contact.edit') {
    getContact(props.id)
  }
})
</script>
<style lang=""></style>
