import { ref, onMounted, toValue } from 'vue'
import { faker } from '@faker-js/faker'

export function useContact() {
  const contacts = ref([])

  function generateContacts(size = 5) {
    for (i in size) {
      let firstName = faker.person.firstName
      let lastName = faker.person.lastName

      contacts.value.push({
        id: faker.string.uuid(),
        name: firstName + ' ' + lastName,
        email: faker.helpers.email({ firstName, lastName }),
        contact: faker.number(),
        picture: faker.image.avatar
      })
    }
  }

  function getContact(id) {
    contacts.value.find((contact) => {
      contact.id === id
    })
  }

  onMounted(() => generateContacts())

  return { contacts: toValue(contacts), generateContacts, getContact }
}
