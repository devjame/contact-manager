<template>
  <v-container fluid>
    <div class="my-4 d-flex">
      <h2 class="text-h4 text-md-h3 text-lg-h2">Contacts</h2>
    </div>
    <v-divider class="mb-4 w-25"></v-divider>
    <v-row>
      <v-col v-for="contact in contacts" :key="contact.id" cols="4">
        <v-card
          :prepend-avatar="contact.picture"
          :title="contact.name"
          :subtitle="contact.contact"
          :text="contact.email"
        >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { faker } from '@faker-js/faker'

const contacts = ref([])

function createRandomContact() {
  let firstName = faker.person.firstName()
  let lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    name: firstName + ' ' + lastName,
    email: faker.internet.email({ firstName, lastName }),
    contact: faker.phone.number('### ### ###'),
    picture: faker.image.avatar()
  }
}
function generateContacts(size = 5) {
  for (let i = 0; i < size; i++) {
    contacts.value.push(createRandomContact())
  }
}

console.log(contacts)
onMounted(() => generateContacts(10))
</script>
