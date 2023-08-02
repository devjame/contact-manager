import { ref, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import http from '@/services/http-common'

/**
 * refactor to work with the json-server
 * @returns
 */
export function useContact() {
  const contacts = ref([])
  const contact = ref({})

  /**
   * function generateContact() {
    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()
    let _id = generateID()
    return {
      id: _id,
      name: firstName + ' ' + lastName,
      email: faker.internet.email({ firstName, lastName }),
      contact: faker.phone.number('### ### ###'),
      picture: faker.image.avatar()
    }
  }
  */

  function generateID() {
    return faker.string.nanoid(10)
  }

  function checkUnique(key, value) {
    const data = contacts.value.filter((item) => item[key] === value)

    if (data) {
      return true
    }

    return false
  }

  async function getContacts() {
    try {
      let response = await http.get('/contacts')
      contacts.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  async function getContact(id) {
    try {
      let response = await http.get(`/contacts/${id}`)
      contacts.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  async function storeContact(data) {
    try {
      /*const response = await http.post('/contacts', {
        id: generateID(),
        ...data
      })*/
      const dataToStore = { id: generateID(), ...data }
      contacts.value = [...contacts.value, dataToStore]
    } catch (error) {
      console.log(error)
    }
  }

  async function destroyContact(id) {
    // check why the last value is delete and why it always return -1
    //await http.post(`/contacts/${id}`)
    contacts.value = contacts.value.filter((item) => item.id !== id)
  }

  async function updateContact(id) {
    //await http.put(`/contacts/${id}`, contact.value)

    contacts.value = contacts.value.map((item) => {
      if (item.id === id) {
        ;(item.name = contact.value.name),
          (item.contact = contact.value.contact),
          (item.email = contact.value.email)
        item.picture = contact.value.picture
      }
      return item
    })
  }

  onMounted(() => {
    getContacts()
  })

  return {
    contact,
    contacts,
    getContacts,
    getContact,
    destroyContact,
    updateContact,
    storeContact,
    checkUnique
  }
}
