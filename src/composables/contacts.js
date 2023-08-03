import { ref, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import http from '@/services/http-common'
import { supabase } from '@/services/supabaseClient'
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

  async function uploadAvatar(filePath, file) {
    try {
      let { error } = await supabase.storage.from('pictures').upload(filePath, file)
      if (error) throw error
    } catch (error) {
      return error
    }
  }

  async function downloadAvatar(filePath) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(filePath)
      if (error) throw error
      return URL.createObjectURL(data)
    } catch (error) {
      return error.message
    }
  }

  function getAvatarUrl(filePath) {
    const { data } = supabase.storage.from('pictures').getPublicUrl(filePath)

    return data.publicUrl
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
      //let response = await http.get('/contacts')
      const { data, error } = await supabase
        .from('contacts')
        .select('name, email, picture, contact, id')
      contacts.value = data

      if (error) throw error
    } catch (error) {
      return error.message
    }
  }

  async function getContact(id) {
    try {
      //let response = await http.get(`/contacts/${id}`)
      const { data, error } = await supabase.from('contacts').select('*').eq('id', id)
      contact.value = data[0]

      if (error) throw error
    } catch (error) {
      return error.message
    }
  }

  async function storeContact(payload) {
    try {
      const { status, error } = await supabase.from('contacts').insert(payload).select()
      console.log(status)
      if (error) throw error
    } catch (error) {
      return error.message
    }
  }

  async function destroyContact(id) {
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id)
      if (error) throw error
      getContacts()
    } catch (error) {
      return error
    }
  }

  async function updateContact(id) {
    //await http.put(`/contacts/${id}`, contact.value)
    /**
     contacts.value = contacts.value.map((item) => {
       if (item.id === id) {
         ;(item.name = contact.value.name),
           (item.contact = contact.value.contact),
           (item.email = contact.value.email)
         item.picture = contact.value.picture
       }
       return item
     })
     * 
     */
    try {
      const { data, error } = await supabase.from('contacts').update(data).eq('id', id).select()
      if (error) throw error
    } catch (error) {
      return error
    }
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
    checkUnique,
    uploadAvatar,
    downloadAvatar,
    getAvatarUrl
  }
}
